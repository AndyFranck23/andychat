import mysql from "mysql"
import express from "express"
import bodyParser from "body-parser";
import cors from "cors"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";

const app = express();


// Charger le fichier `.env`
dotenv.config();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET
const NOM_DE_DOMAIN = process.env.VITE_API_URL

app.use(express.json())
app.use(cors({
    origin: "https://andychat23.netlify.app", // Domaine autorisé
    credentials: true, // Permettre l'envoi des cookies
}));
app.use(bodyParser.json({ limit: '10mb' })); // Par exemple, 50mb
app.use(cookieParser());




// NEW CODE (connection à la db) ------------------------------------------------------------
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la db : ", err)
        return
    }
    console.log("Connecté à la bd MySql")
})
// END NEW CODE ------------------------------------------------------------

const loginAdmin = "ironmanandy23@gmail.com"

// Se connecter
app.post('/login', (req, res) => {
    const data = req.body
    let sql = "SELECT * FROM users WHERE email = ?"
    db.query(sql, [data.form.email], (err, result) => {
        if (err) {
            return res.status(503).json({ message: "Erreur du serveur" })
        }
        if (result.length == 0) {
            return res.status(402).json({ message: "Mauvais identifiant" })
        }
        bcrypt.compare(data.form.password, result[0].password, (err, goodId) => {
            if (err) {
                return res.status(504).json({ message: "Erreur du serveur" })
            }
            if (!goodId) {
                return res.status(401).json({ message: "Mot de passe incorrect" })
            }

            // Générer le token 
            let out = ''
            let admin = false
            if (data.form.email == loginAdmin) {
                out = 48
                admin = true
            } else {
                out = 1
            }

            const token = jwt.sign(
                { userId: result[0].id, email: result[0].email },
                JWT_SECRET,
                { expiresIn: out + 'h' }
            )

            // Envoyer le token via un cookie
            res.cookie('authToken', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'strict',
                maxAge: 3600 * 1000 * out, // 1 heure
            });

            return res.status(201).json({
                message: "Connexion réussie",
                // token,
                user: { admin: admin, id: result[0].id, role: result[0].role, identite: result[0].identite, email: result[0].email, autorisation: result[0].autorisation }
            })
        })
    })
})

// TEST DE JWT
const authentificationToken = (req, res, next) => {
    const token = req.cookies?.authToken;
    if (!token) {
        // console.log('token manquant')
        return res.status(401).json({ message: "Veuillez vous re-connecté" });
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        console.log('le token: ' + token)
        next();
    } catch (error) {
        console.log("erreur du token: " + error)
        res.status(408).json({ message: "Session invalide ou expiré" });
    }
};

app.get('/protected', authentificationToken, (req, res) => {
    return res.status(220).json({ message: "Accès à la route protégée autorisé", user: req.user });
});
// FIN TEST DE JWT

app.post('/logout', (req, res) => {
    res.clearCookie('authToken'); // Supprime le cookie contenant le token
    res.status(200).json({ message: 'Déconnexion réussie' });
});


// Inscription
app.post('/signUp', (req, res) => {
    const data = req.body;
    // Traitement des données ici...
    let sql = "SELECT * FROM users WHERE email = ?"
    db.query(sql, [data.form.email], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Erreur du serveur" })
        }
        if (result.length > 0) {
            return res.status(400).json({ message: "L'email est déjà utilisé" })
        }

        // Chiffrer le mot de passe
        bcrypt.hash(data.form.password, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(501).json({ message: "Erreur du serveur" })
            }
            // insert les données dans la db
            sql = "INSERT INTO users (identite, role, email, autorisation, date, password) VALUES (?, ?, ?, ?, ?, ?)"
            db.query(sql, [data.form.identite, data.form.role, data.form.email, data.form.autorisation, data.form.date, hashedPassword], (err, result) => {
                if (err) {
                    return res.status(502).json({ message: "Erreur du serveur" })
                }

                return res.status(200).json({ message: "Inscription réussi" })
            })
        })
    })
    // FIN Traitement des données...
});




// LISTE DES COMPTES EXISTANTS
app.get('/compte', (req, res) => {
    const sql = "SELECT * FROM users WHERE email != ? AND autorisation = ?"
    db.query(sql, [loginAdmin, 1], (err, result) => {
        if (err) {
            return res.status(505).json({ message: "Erreur du serveur" })
        }
        return res.status(203).json({ users: result })
    })
})

// SUPPRIMER UN COMPTE
app.delete('/compte/:id', (req, res) => {
    const { id } = req.params
    const sql = "DELETE FROM users WHERE id = ?"
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(506).json({ message: "Erreur du serveur" })
        }
        if (result.affectedRows == 0) {
            return res.status(409).json({ message: "Compte non trouvé" })
        } else {
            return res.status(204).json({ message: "Compte supprimé avec succès" })
        }
    })
})

// LISTE DES DEMANDES
app.get('/demande', (req, res) => {
    const sql = "SELECT * FROM users WHERE autorisation = ?"
    db.query(sql, [0], (err, result) => {
        if (err) {
            return res.status(505).json({ message: "Erreur du serveur" })
        }
        return res.status(203).json({ users: result })
    })
})

// SUPPRIMER UN DEMANDE AVEC LE COMPTE LUI MÊME
app.delete('/demandeDelete/:id', (req, res) => {
    const { id } = req.params
    const sql = "DELETE FROM users WHERE id = ?"
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(506).json({ message: "Erreur du serveur" })
        }
        if (result.affectedRows == 0) {
            return res.status(409).json({ message: "Compte non trouvé" })
        } else {
            return res.status(204).json({ message: "Compte supprimé avec succès" })
        }
    })
})

// ACCEPTER LA DEMANDE ET METTRE A JOUR LA BD
app.put('/demandeAgree/:id', (req, res) => {
    const { id } = req.params
    const sql = "UPDATE users SET autorisation=? WHERE id=?"
    db.query(sql, [1, id], (err, result) => {
        if (err) {
            return res.status(507).json({ message: "Erreur du serveur" })
        }
        if (result.affectedRows == 0) {
            return res.status(410).json({ message: "Compte non trouvé" })
        } else {
            return res.status(205).json({ message: "Compte accepter avec succès" })
        }
    })
})

// AJOUT D'UN TYPE DE CLASSEMENT
app.post('/addType', (req, res) => {
    const data = req.body;
    // Traitement des données ici...
    let sql = "SELECT * FROM type WHERE title = ?"
    db.query(sql, [data.form.title], (err, result) => {
        if (err) {
            return res.status(508).json({ message: "Erreur du serveur" })
        }
        if (result.length > 0) {
            return res.status(411).json({ message: "Cette type éxiste déjà" })
        }

        // insert les données dans la db
        sql = "INSERT INTO type (title, image) VALUES (?, ?)"
        db.query(sql, [data.form.title, data.form.image], (err, result) => {
            if (err) {
                return res.status(509).json({ message: "Erreur du serveur" })
            }

            return res.status(206).json({ message: "Traitement réussi" })
        })
    })
    // FIN Traitement des données...
});

// LISTE DES TYPES DE CLASSEMENTS
app.get('/allType', (req, res) => {
    const sql = "SELECT * FROM type"
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(510).json({ message: "Erreur du serveur" })
        }
        return res.status(207).json({ types: result, message: "Traitement réussi" })
    })
})

// AJOUT D'UN DE CLASSEMENT
app.post('/addClassement', (req, res) => {
    const data = req.body;
    // Traitement des données ici...
    let sql = "SELECT * FROM classements WHERE title = ?"
    db.query(sql, [data.form.title], (err, result) => {
        if (err) {
            return res.status(511).json({ message: "Erreur du serveur" })
        }
        if (result.length > 0) {
            return res.status(412).json({ message: "Cette classement éxiste déjà" })
        }

        // insert les données dans la db
        sql = "INSERT INTO classements (title, type, logo, faq, responsable) VALUES (?, ?, ?, ?, ?)"
        db.query(sql, [data.form.title, data.form.type, data.form.logo, JSON.stringify(data.form.faqListe), data.form.responsable], (err, result) => {
            if (err) {
                return res.status(512).json({ message: "Erreur du serveur" })
            }
            return res.status(208).json({ message: "Traitement réussi" })
        })
    })
    // FIN Traitement des données...
});

// LISTE DES CLASSEMENTS
app.get('/allClassement', (req, res) => {
    const sql = "SELECT * FROM classements"
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(513).json({ message: "Erreur du serveur" })
        }
        return res.status(209).json({ classements: result, message: "Traitement réussi" })
    })
})

// AJOUT D'UN OFFRE
app.post('/addOffre', (req, res) => {
    const data = req.body;
    // if (!data.form.image) {
    //     return res.status(420).json({ message: "image tsy mety" })
    // }
    // const imageBuffer = Buffer.from(data.form.image, 'base64')
    // insert les données dans la db
    const sql = "INSERT INTO offres (title, classement, descriptionOC, image, prix, reduction, lien, descriptionOD) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    db.query(sql, [data.form.title, JSON.stringify(data.form.classement), JSON.stringify(data.form.descriptionOC), data.form.image, data.form.prix, data.form.reduction, data.form.lien, data.form.descriptionOD], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(514).json({ message: "Erreur du serveur" })
        }
        return res.json({ message: "Traitement réussi", data: data.form.classement })
    })
});

// LISTE DES OFFRES
// SELECT * FROM nom_table ORDER BY id_colonne DESC LIMIT nombre;
// SELECT * FROM nom_table WHERE id BETWEEN 1 AND 200 ORDER BY id DESC;
app.get('/offres', (req, res) => {
    const sql = "SELECT * FROM offres ORDER BY id DESC"
    db.query(sql, (err, result) => {
        if (err) {
            return res.status(515).json({ message: "Erreur du serveur" })
        }
        return res.status(210).json({ offres: result, message: "Traitement réussi" })
    })
})

// SUPPRIMER UN OFFRE
app.delete('/offreDelete/:id', (req, res) => {
    const { id } = req.params
    const sql = "DELETE FROM offres WHERE id = ?"
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(516).json({ message: "Erreur du serveur" })
        }
        if (result.affectedRows == 0) {
            return res.status(413).json({ message: "Offre non trouvé" })
        } else {
            return res.status(211).json({ message: "Offre supprimé avec succès" })
        }
    })
})

// MODIFIER ET METTRE A JOUR LA BD D'UNE OFFRE
app.post('/offreUpdate/:id', (req, res) => {
    const { id } = req.params
    const data = req.body;
    const sql = "UPDATE offres SET title=?, classement=?, descriptionOC=?, image=?, prix=?, reduction=?, lien=?, descriptionOD=? WHERE id=?"
    db.query(sql, [data.form.title, JSON.stringify(data.form.classement), JSON.stringify(data.form.descriptionOC), data.form.image, data.form.prix, data.form.reduction, data.form.lien, data.form.descriptionOD, id], (err, result) => {
        if (err) {
            return res.status(517).json({ message: "Erreur du serveur" })
        }
        if (result.affectedRows == 0) {
            return res.status(414).json({ message: "Offre non trouvé" })
        } else {
            return res.status(212).json({ message: "Offre modifié avec succès" })
        }
    })
})

// DONNEES D'UNE OFFRE
app.get('/offreSelect/:id', (req, res) => {
    const { id } = req.params
    const sql = "SELECT * FROM offres WHERE id = ?"
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(518).json({ message: "Erreur du serveur" })
        }
        return res.status(213).json({ offre: result })
    })
})
// DONNEES D'UNE TYPE
app.get('/typeSelect/:id', (req, res) => {
    const { id } = req.params
    const sql = "SELECT * FROM type WHERE id = ?"
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(518).json({ message: "Erreur du serveur" })
        }
        return res.status(213).json({ type: result })
    })
})


// SUPPRIMER UN TYPE DE CLASSEMENT
app.delete('/typeDelete/:id', (req, res) => {
    const { id } = req.params
    const sql = "DELETE FROM type WHERE id = ?"
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(516).json({ message: "Erreur du serveur" })
        }
        if (result.affectedRows == 0) {
            return res.status(413).json({ message: "Type non trouvé" })
        } else {
            return res.status(211).json({ message: "Type supprimé avec succès" })
        }
    })
})

// MODIFIER ET METTRE A JOUR LA BD D'UNE TYPE DE CLASSEMENT
app.post('/typeUpdate/:id', (req, res) => {
    const { id } = req.params
    const data = req.body;
    const sql = "UPDATE type SET title=?, image=? WHERE id=?"
    db.query(sql, [data.form.title, data.form.image, id], (err, result) => {
        if (err) {
            return res.status(517).json({ message: "Erreur du serveur" })
        }
        if (result.affectedRows == 0) {
            return res.status(414).json({ message: "Type non trouvé" })
        } else {
            return res.status(212).json({ message: "Type modifié avec succès" })
        }
    })
})

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
