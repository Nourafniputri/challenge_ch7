const CryptoJS = require('crypto-js');
const JWT = require('jsonwebtoken');
const { user } = require('../models/User');
const { room } = require('../models/room');
const { history } = require('../models/history')

class MainController {
    static getGameTraditional(req,res) {
        res.render('TraditionalGame');
    }

    static showRegisterPage(req,res) {
        res.render('Register', { isWrong: "hidden"});
    }
    
    static async postRegisterPage(req,res) {
        try {
            const {email,username,password,confirm_password} = req.body;
            if(password !== confirm_password) {
                return res.render('Register',  { isWrong: ""})
            }
            const hashedPassword = CryptoJS.HmacSHA256(password, process.env.SECRET_LOGIN).toString();
            await user.insertData(email,username, hashedPassword)
            res.redirect('/login')
        } catch(error) {
            console.log(error);
            res.status(500).send('Database Error')
        }
    }
    
    static showLoginPage(req,res) {
        res.render('Login', { isWrong: "hidden"});
    }

    static async postLoginPage(req,res) {
       try {
            const { email,password } = req.body;
            let userData = await user.getData(email);
            if(userData === null) {
                return res.render('Login', { isWrong: ""});
            }
            const hashedPassword = CryptoJS.HmacSHA256(password, process.env.SECRET_LOGIN).toString();
            if( hashedPassword !== userData.password ) {
                return res.render('Login', { isWrong: ""});
            }
            const token = JWT.sign({ email, id: userData.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24 });
            res.redirect('/dashboard');
        } catch (error) {
            console.log(error);
            res.status(500).send('Internal server error')
        }
    }

    static async mainPage(req,res) {
       res.render('index', { title: 'Express' });
    }

    static getDashboard(req,res)  {
        res.render('dashboard');
    }

    static getCreateRoom(req,res) {
        res.render('createRoom');
    }

    static async postCreateRoom(req,res) {
        try {
            const { namaRoom, username} = req.body;
            await room.insertData(namaRoom,username )
            res.redirect('/roomGame')

        }catch (error) {
            console.log(error);
            res.status(500).send('Internal server error')
        }
    }

    static getJoiningRoom(req, res) {
        res.render('joiningRoom')
    }

    static async getRoomGame(req, res) {
        res.render('roomGame');
    }

    static getFightRoom(req,res) {
        res.render('SuitGame');
    }

    // static async postFightRoom(req,res) {
    //     const ronde = 3;
    //     const hasilRonde = [];

    //     for (let i = 0; i < ronde; i++) {
    //         const pilihanPlayer = 'batu'; 
    //         const pilihanServer = getPilihanServer();
    //         const hasil = getHasil(pilihanPlayer, pilihanServer);

    //         hasilRonde.push({
    //         ronde: i + 1,
    //         player: pilihanPlayer,
    //         server: pilihanServer,
    //         hasil: hasil,
    //         });
    //     }

    //     try {
    //         await history.bulkCreate(hasilRonde);
    //         console.log('Hasil permainan telah disimpan ke basis data.');
    //     } catch (error) {
    //         console.error('Gagal menyimpan hasil permainan ke basis data:', error);
    //     }
    // }

    


};

module.exports = { MainController }

