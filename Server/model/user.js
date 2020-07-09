var pool = require('./databaseConfig.js');
var userDB = {
    getUsers: function (callback){
        pool.getConnection(function (err, conn) {
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM user';
                conn.query(sql, function (err, result) {
                    conn.release();
                    if(err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    }
    /* end function getUser */
    ,

    addUser: function (useremail, userpassword, name, callback){
        pool.getConnection(function (err, conn) {
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'INSERT INTO user (useremail, userpassword, name) values (?,?,?)';
                conn.query(sql, [useremail, userpassword, name], function (err, result) {
                    conn.release();
                    if(err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    }
    //end function addUser//
    ,

    deleteUser: function (userid, callback) {
        pool.getConnection(function (err, conn) {
            if(err){
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'DELETE FROM user WHERE userid=?';
                conn.query(sql, [userid], function (err, result) {
                    conn.release();
                    if(err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    }
    //end function deleteUser//
    ,

    updateUser: function(userpassword, name, userid, callback) {
        pool.getConnection(function (err, conn) {
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                console.log(userpassword+", "+name+", "+userid)
                var sql = 'UPDATE user SET userpassword=?, name=? WHERE userid=?';
                conn.query(sql, [userpassword, name, userid], function (err, result) {
                    conn.release();
                    if(err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        console.log(result);
                        return callback(null, result);
                    }
                });
            }
        });
    }
    //end function updateUser //
};
module.exports = userDB
