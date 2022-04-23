const bcrypt= require( 'bcryptjs');
const db = require('../db');
const jwt = require('jsonwebtoken');


exports.login = async (req, res) => {
  const { email, password } = req.body;
    const uniqueEmail = `SELECT * FROM user WHERE email = '${email}'`;
    db.query(uniqueEmail, (error, result) => {
      if (error) {
        return res.status(401).json({ message: 'Une erreur est survenue' });
      } else if (result.length > 0) {
const isValid = bcrypt.compareSync(password,result[0].password)
        
        if(isValid) {return res.status(200).json({
          userId: result[0].userId,
          firstName: result[0].nom,
          lastName: result[0].prenom,
          token: jwt.sign(
            { userId: result[0].userId },
            "SECRET_KEY",
            {
              expiresIn: '24h',
            }
          ),
        });
        
        }
        else {
          return res.status(401).json({message :'mot de passe incorrect'})
        }
      } else {
        return res.status(401).json({ message: "l'utilisateur n'existe pas" });
      }
    });
};

exports.signup = async (req, res) => {
  const { nom, prenom, email, password } = req.body;
  if (nom && prenom && email && password) {
    const uniqueEmail = `SELECT * FROM user WHERE email = '${email}'`;
    db.query(uniqueEmail, (error, result) => {
      if (error) {
        return res.status(401).json({ message: 'Une erreur est survenue' });
      } else if (result.length > 0) {
        return res.status(401).json({ message: 'Cet email est déjà utilisé' });
      } else {
        return checkEmailPassword(nom, prenom, password, email, res);
      }
    });
  } else {
    return res
      .status(401)
      .json({ loggedIn: false, message: 'Formulaire incomplet' });
  }
};

async function checkEmailPassword(nom, prenom, password, email, res) {
  const passwordHash = bcrypt.hashSync(password, 10)
  const sql = `INSERT INTO user (nom, prenom, email, password) VALUES ('${nom}', 
  '${prenom}', '${email}', '${passwordHash}')`;
  try {
    db.query(sql, (error) => {
      if (error) {
        return res.status(401).json({ message: 'Une erreur est survenue' });
      }
      return res.status(201).json({ message: 'Enregistrement confirmé' });
    });
  } catch (err) {
    return res.status(500).json({ loggedIn: false, message: 'Erreur' });
  }
}