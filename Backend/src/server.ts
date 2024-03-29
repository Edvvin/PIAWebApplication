import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import mongoose, { Schema, Types } from 'mongoose';
import user from './model/user';
import estate from './model/estate';
import path from 'path';
import config from './model/config';

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mydb');

const conn = mongoose.connection;
conn.once('open', () => {
    console.log('Mongo ready!')
});

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'upload');
    },
    filename: (req, file, callBack) => {
        callBack(null, Date.now() + '.' + `${file.originalname}`);
    },
});

var upload = multer({ storage: storage });

router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    user.findOne({ 'username': username, isVerified: 'verified' }, (err, usr: any) => {
        if (err) {
            console.log(err);
        } else {
            if (usr) {
                if (usr.password === password) {
                    let data = {
                        user: usr,
                        status: "OK",
                        message: "Log in successful.",
                    };
                    res.json(data);
                } else {
                    let data = {
                        user: usr,
                        status: "FAIL",
                        message: "Password wrong",
                    };
                    res.json(data);
                }
            } else {
                let data = {
                    status: "FAIL",
                    message: "Cannot find user " + username,
                };
                res.json(data);
            }
        }
    });
});

router.route('/changepass').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let newpassword = req.body.newpassword;

    user.findOne({ 'username': username }, (err, usr: any) => {
        if (err) {
            console.log(err);
        } else {
            if (usr) {
                if (usr.password === password) {
                    usr.password = newpassword;
                    usr.save().then(() => {
                        let data = {
                            status: "OK",
                            message: "Change successful",
                        };
                        res.json(data);
                    }).catch(() => {
                        let data = {
                            status: "FAIL",
                            message: "Change failed",
                        };
                        res.json(data);
                    });
                } else {
                    let data = {
                        status: "FAIL",
                        message: "Password wrong",
                    };
                    res.json(data);
                }
            } else {
                let data = {
                    status: "FAIL",
                    message: "Cannot find user " + username,
                };
                res.json(data);
            }
        }
    });
});

router.route('/register').post((req, res) => {
    let u: any = new user(req.body);
    user.findOne({ 'username': u.username }, (err, usr) => {
        if (err) {
            console.log(err);
            return;
        }
        if (usr) {
            let data = {
                status: "FAIL",
                message: "Username: " + u.username + " already exists",
            };
            res.json(data);
        } else {
            u.save().then(() => {
                let data = {
                    status: "OK",
                    message: "User registered",
                };
                res.json(data);
            }).catch(() => {
                let data = {
                    status: "FAIL",
                    message: "Failed to register",
                };
                res.status(400).json(data);
            });
        }
    });
});

router.route('/verifyuser').post((req, res) => {
    let username = req.body.username;
    user.findOne({ 'username': username }, (err, u) => {
        if (err) {
            console.log(err);
        } else {
            if (u) {
                user.collection.updateOne({ "username": username },
                    { $set: { 'isVerified': 'unverified' } });
                res.json({ 'message': 'Successfully verified user' });
            } else {
                res.json({ 'message': 'user: ' + username + 'not found' });
            }
        }
    });
});


router.route('/unverified').get((req, res) => {
    user.find({ isVerified: 'unverified' }, (err, u) => {
        if (err) {
            console.log(err);
        } else {
            res.json(u);
        }
    });
});

router.route('/allusers').get((req, res) => {
    user.find({}, (err, u) => {
        if (err) {
            console.log(err);
        } else {
            res.json(u);
        }
    });
});

router.route('/getallestates').get(
    (req, res) => {
        estate.find({},
            (err, e) => {
                if (err) {
                    console.log(err);
                } else {
                    res.json(e);
                }
            });
    });

router.route('/archivechat').post(
    (req, res) => {
        let id = req.body.id;
        let username = req.body.username;
        let isOwner = req.body.isOwner;

        estate.findById(id,
            (err, e: any) => {
                if (err) {
                    let data = {
                        status: 'FAIL',
                    };

                    console.log(err);
                } else {
                    let chat = e.chats.find((c: any) => c.username === username);
                    if (chat) {
                        if (isOwner) {
                            chat.isArchivedByOwner = !chat.isArchivedByOwner;
                        } else {
                            chat.isArchivedByCustomer = !chat.isArchivedByCustomer;
                        }
                        e.save().then((e: any) => {
                            let data = {
                                status: 'OK',
                            };

                            res.json(data);
                        }).catch((e: any) => {
                            let data = {
                                status: 'FAIL',
                            };

                            res.json(data);
                        });
                    } else {
                        let data = {
                            status: 'FAIL',
                        };

                        res.json(data);
                    }

                }
            });
    });

router.route('/changepass').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user.collection.updateOne({ username: username },
        { $set: { password: password } });

    res.json({ message: 'Successfully change password' });
});

router.route('/upload').post(upload.single('file'), (req: any, res, next) => {
    const file = req.file;
    console.log(file);
    if (!file) {
        const error = new Error('No file given');
        return next(error);
    }
    res.send(file);
});

router.route('/download').post((req, res, next) => {
    var filepath = path.join(__dirname, '../upload' + '/' + req.body.filename);
    res.sendFile(filepath);
});

router.route('/setimage').post((req, res) => {
    let username = req.body.username;
    let img = req.body.img;
    user.findOne({ username: username }, (err, usr) => {
        if (err) {
            console.log(err);
            res.status(400).json({ 'status': 'FAIL' });
        } else {
            if (usr) {
                user.collection.updateOne({ username: username }, { $set: { image: img } });
                res.json({ status: 'OK' });
            } else {
                res.status(400).json({ status: 'FAIL' });
            }
        }
    });
});

router.route('/setestateimage').post((req, res) => {
    let id = req.body.id;
    let img = req.body.img;
    estate.findById(id, (err, est) => {
        if (err) {
            console.log(err);
            res.status(400).json({ 'status': 'FAIL' });
        } else {
            if (est) {
                estate.findByIdAndUpdate(id, { $push: { images: img } }, (err, res1) => { });
                res.json({ status: 'OK' });
            } else {
                res.status(400).json({ status: 'FAIL' });
            }
        }
    });
});

router.route('/addestate').post((req, res) => {
    let e = new estate(req.body);
    e.save().then((est) => {
        let data = {
            status: "OK",
            estateid: est._id,
            message: "Estate added",
        };
        res.json(data);
    }).catch((err) => {
        console.log(err);
        let data = {
            status: "FAIL",
            estateid: "",
            message: "Failed to register",
        };
        res.status(400).json(data);
    });
});

router.route('/search').post((req, res) => {
    let searchObj: any = {
        price: { $gt: req.body.lower, $lt: req.body.upper },
        isVerified: true,
        isSold: false,
    };

    if (req.body.city !== '') {
        searchObj.city = req.body.city;
    }

    estate.find(searchObj, (err, est) => {
        if (err) {
            console.log(err);
            let data = {
                status: "FAIL",
                message: "Failed to search",
            }
        } else {
            let data = {
                status: "OK",
                message: "Successfully searched",
                estates: est,
            }
            res.json(data);
        }
    });
});

router.route('/getestate').post((req, res) => {
    let id = req.body.id;
    estate.findById(id, (err, est) => {
        if (err) {
            console.log(err);
        } else {
            let data = {
                status: "OK",
                message: "Estate retrieved",
                estate: est,
            }
            res.json(data);
        }
    });
});

router.route('/sellestate').post((req, res) => {
    let id = req.body.id;
    estate.findByIdAndUpdate(id, { $set: { isSold: true } },
        (err, res1) => {
            if (err) {
                let data = {
                    status: 'FAIL',
                    message: 'Failed to accept the offer',
                };
                res.json(data);
            } else {
                let data = {
                    status: 'OK',
                    message: 'Success',
                };
                res.json(data);
            }
        });
});

router.route('/sendtoowner').post((req, res) => {
    let id = req.body.id;
    let fromUser = req.body.fromUser;
    let message = req.body.message;

    estate.findById(id,
        (err, res1: any) => {
            if (err) {
                let data = {
                    status: 'FAIL',
                    message: 'Failed to accept the offer',
                };
                res.json(data);
            } else {
                let chat = res1.chats.find((c: any) => (c.username === fromUser));
                chat.messages.push({ text: message, fromClient: true, sender: fromUser, time: new Date() });
                chat.time = new Date();
                chat.isArchivedByCustomer = false;
                chat.isArchivedByOwner = false;
                res1.save().then((x: any) => {
                    let data = {
                        status: 'OK',
                        message: 'Success',
                    };
                    res.json(data);
                }).catch((err: any) => {
                    let data = {
                        status: 'FAIL',
                        message: 'Failed to send message to owner',
                    };
                    res.json(data);
                });
            }
        });
});

router.route('/sendtoclient').post((req, res) => {
    let id = req.body.id;
    let fromUser = req.body.fromUser;
    let toUser = req.body.toUser;
    let message = req.body.message;

    estate.findById(id,
        (err, res1: any) => {
            if (err) {
                let data = {
                    status: 'FAIL',
                    message: 'Failed to accept the offer',
                };
                res.json(data);
            } else {
                let chat = res1.chats.find((c: any) => (c.username === toUser))
                chat.messages.push({ text: message, fromClient: true, sender: fromUser, time: (new Date()) });
                chat.time = new Date();
                chat.isArchivedByCustomer = false;
                chat.isArchivedByOwner = false;
                res1.save().then((x: any) => {
                    let data = {
                        status: 'OK',
                        message: 'Success',
                    };
                    res.json(data);
                }).catch((err: any) => {
                    let data = {
                        status: 'FAIL',
                        message: 'Failed to send message to owner',
                    };
                    res.json(data);
                });
            }
        });
});

router.route('/newchat').post((req, res) => {
    let username = req.body.username;
    let id = req.body.id;
    estate.findByIdAndUpdate(id, { $push: { chats: { username: username, isArchivedByOwner: false, isArchivedByCustomer: false, time: new Date(), messages: [] } } },
        (err, res1) => {
            if (err) {
                let data = {
                    status: 'FAIL',
                    message: 'Failed to accept the offer',
                };
                res.json(data);
            } else {
                let data = {
                    status: 'OK',
                    message: 'Success',
                    chat: {
                        username: username,
                        isArchivedByOwner: false,
                        isArchivedByCustomer: false,
                        messages: [] as any[],
                        time: new Date(),
                    },
                };
                res.json(data);
            }
        });
});

router.route('/sendoffer').post((req, res) => {
    let id = req.body.id;
    let username = req.body.username;
    let fromDate = req.body.dateFrom;
    let toDate = req.body.dateTo;
    let offer = req.body.offer;

    estate.findById(id, (err, est: any) => {
        if (err) {
            let data = {
                status: 'FAIL',
                message: 'Failed to send offer',
            };
            res.json(data);
        }
        if (est) {
            let c = est.chats.find((chat: any) => (chat.username === username));
            if (c) {
                if (est.isForSale) {
                    c.offer = {
                        price: offer,
                    };
                } else {
                    c.offer = {
                        price: offer,
                        fromDate: fromDate,
                        toDate: toDate,
                    };
                }
                c.time = new Date();
                c.isArchivedByCustomer = false;
                c.isArchivedByOwner = false;
                est.save().then((x: any) => {
                    let data = {
                        status: 'OK',
                        message: 'Success',
                    };
                    res.json(data);
                }).catch((err: any) => {
                    console.log(err);
                    let data = {
                        status: 'FAIL',
                        message: 'Failed to send offer',
                    };
                    res.json(data);
                });
            }
        } else {
            let data = {
                status: 'FAIL',
                message: 'Failed to send offer',
            };
            res.json(data);
        }
    });
});

router.route('/acceptoffer').post((req, res) => {
    let id = req.body.id;
    let username = req.body.username;

    config.findOne({}, (err, conf: any) => {
        estate.findById(id, (err, est: any) => {
            if (err) {
                let data = {
                    status: 'FAIL',
                    message: 'Failed to send offer',
                };
                res.json(data);
            }
            if (est) {
                let c = est.chats.find((chat: any) => (chat.username === username));
                if (c) {
                    if (est.isForSale) {
                        let p = c.offer.price;
                        if (!est.ownedByAgency) {
                            p *= conf.percent / 100.0;
                        }
                        est.sold = {
                            toUser: username,
                            amount: c.offer.price,
                            profit: p,
                        };
                        est.isSold = true;
                    } else {
                        let ocu = {
                            fromDate: c.offer.fromDate,
                            toDate: c.offer.toDate,
                        };
                        est.occupied.push(ocu);
                    }
                    c.offer = {};
                    est.save().then((x: any) => {
                        let data = {
                            status: 'OK',
                            message: 'Success',
                        };
                        res.json(data);
                    }).catch((err: any) => {
                        console.log(err);
                        let data = {
                            status: 'FAIL',
                            message: 'Failed to send offer',
                        };
                        res.json(data);
                    });
                }
            } else {
                let data = {
                    status: 'FAIL',
                    message: 'Failed to send offer',
                };
                res.json(data);
            }
        });
    });
});

router.route('/declineoffer').post((req, res) => {
    let id = req.body.id;
    let username = req.body.username;

    estate.findById(id, (err, est: any) => {
        if (err) {
            let data = {
                status: 'FAIL',
                message: 'Failed to send offer',
            };
            res.json(data);
        }
        if (est) {
            let c = est.chats.find((chat: any) => (chat.username === username));
            if (c) {
                c.offer = {};
                est.save().then((x: any) => {
                    let data = {
                        status: 'OK',
                        message: 'Success',
                    };
                    res.json(data);
                }).catch((err: any) => {
                    console.log(err);
                    let data = {
                        status: 'FAIL',
                        message: 'Failed to send offer',
                    };
                    res.json(data);
                });
            }
        } else {
            let data = {
                status: 'FAIL',
                message: 'Failed to send offer',
            };
            res.json(data);
        }
    });
});

router.route('/acceptuser').post((req, res) => {
    let username = req.body.username;
    user.findOne({ username: username }, (err, usr: any) => {
        if (usr) {
            usr.isVerified = 'verified';
            usr.save().then(() => {
                let data = {
                    status: 'OK',
                };
                res.json(data);
            }).catch((e: any) => {
                console.log(e);
                let data = {
                    status: 'FAIL',
                };
                res.json(data);
            });
        } else {
            let data = {
                status: 'FAIL',
            };
            res.json(data);
        }
    });
});

router.route('/rejectuser').post((req, res) => {
    let username = req.body.username;
    user.findOneAndRemove({ username: username }, (err, usr: any) => {
        if (usr) {
            let data = {
                status: 'OK',
            };
            res.json(data);
        } else {
            let data = {
                status: 'FAIL',
            };
            res.json(data);
        }
    });
});

router.route('/promote').post((req, res) => {
    let id = req.body.id;
    estate.findById(id, (err, est: any) => {
        est.isPromoted = !est.isPromoted;
        est.save().then(() => {
            let data = {
                status: 'OK',
            };
            res.json(data);
        }).catch((err: any) => {
            console.log(err);
            let data = {
                status: 'FAIL',
            };
            res.json(data);
        });
    });
});

router.route('/myestates').post((req, res) => {
    let username = req.body.username;
    estate.find({ owner: username }, (err, est) => {
        if (err) {
            console.log('Error');
        } else {
            res.json(est);
        }
    });
});

router.route('/getuser').post((req, res) => {
    let username = req.body.username;
    user.findOne({ username: username }, (err, usr) => {
        if (err) {
            console.log('Error');
        } else {
            res.json(usr);
        }
    });
});

router.route('/edituser').post((req, res) => {
    let username = req.body.username;
    let newuser = req.body.user;
    user.findOne({ username: username }, (err: any, usr: any) => {
        if (err) {
            console.log('Error');
        } else {
            if (usr) {
                usr.name = newuser.name;
                usr.surname = newuser.surname;
                usr.country = newuser.country;
                usr.city = newuser.city;
                usr.save().then(() => {
                    let data = {
                        status: 'OK',
                    };
                    res.json(data);

                }).catch((err: any) => {
                    console.log('Error');
                });
            }
        }
    });
});

router.route('/block').post((req, res) => {
    let blocker = req.body.blocker;
    let blocked = req.body.blocked;
    let isAgency = req.body.isAgency;
    user.findOne({ username: blocked }, (err, usr: any) => {
        if (err) {
            console.log('Error');
        }
        else {
            if (usr) {
                if (isAgency) {
                    if (usr.blockedByAgency) {
                        usr.blockedByAgency = false;
                    }
                    else {
                        usr.blockedByAgency = true;
                    }
                }
                else {
                    if (usr.blockedBy) {
                        let ind = usr.blockedBy.findIndex((e: any) => e === blocker);
                        if (ind !== -1) {
                            usr.blockedBy.splice(ind);
                        } else {
                            usr.blockedBy.push(blocker);
                        }
                    }
                    else {
                        usr.blockedBy = [blocker];
                    }
                }
                usr.save().then(() => {
                    let data = {
                        status: 'OK',
                    };
                    res.json(data);
                }).catch((err: any) => {
                    let data = {
                        status: 'FAIL',
                    };
                    res.json(data);
                });
            }
            else {
                console.log('Error');
            }
        }
    })
});

router.route('/getunverifiedestates').get((req, res) => {
    estate.find({ isVerified: false }, (err, est) => {
        if (err) {
            console.log('Error');
        } else {
            res.json(est);
        }
    });
});

router.route('/verifyestate').post((req, res) => {
    let id = req.body.id;

    estate.findById(id, (err, est: any) => {
        if (est) {
            est.isVerified = true;
            est.save().then(() => {
                let data = {
                    status: 'OK',
                };

                res.json(data);
            }).catch((err: any) => {
                let data = {
                    status: 'FAIL',
                };

                res.json(data);
            });
        }
        else {
            let data = {
                status: 'FAIL',
            };

            res.json(data);
        }
    });
});

router.route('/getallsold').get((req, res) => {
    estate.find({isSold: true}, (err, e) => {
        if (err) {
            console.log(err);
        } else {
            res.json(e);
        }
    });
});

router.route('/setpercent').post((req, res) => {
    let percent = req.body.percent;
    config.findOne({}, (err, conf: any) => {
        conf.percent = percent;
        conf.save().then(()=>{
            let data = {
                status: 'OK',
            };

            res.json(data);
        }).catch((err: any) => {
            let data = {
                status: 'FAIL',
            };

            res.json(data);
        });
    });
});


//app.get('/', (req, res) => res.send('Hello World!'));
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));