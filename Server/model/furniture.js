var pool = require('./databaseConfig.js');
var furnitureDB = {
    getFurnitureByCat: function(catid, callback) {
        pool.getConnection(function (err, conn){
            if(err){
                console.log(err, null);
            }
            else {
                console.log("Connected!");
                var sql = 'SELECT * FROM tb_furniture where cat_id = ?';
                conn.query(sql, [catid], function (err, result) {
                    conn.release();
                    if (err) {
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
    };
module.exports = furnitureDB