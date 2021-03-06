var fs = require('fs'),
    path = require('path');

/*modules.save takes 2 params with an required callback
 * @file is the file object
 * @dirname is the folder destination for the file
 * The callback is executed on completion with params err, @file
 * if no error, err is will be null
 */
module.exports.save = function(file, dirname, filename, callback){
  fs.exists(path.join(dirname, filename), function(exists){
    if (exists) callback ("File already exists, rename the file");
    else{
      fs.readFile(file.path, function(err, data){
        if (err) callback(err)
        else { 
          fs.writeFile(path.join(dirname, filename), data, function(err){
            if (err) callback(err);
            else callback(err, file);
          });
        }
      });
    }
  });
}

module.exports.delete = function(dirname, filename, callback){
  fs.exists(path.join(dirname, filename), function(exists){
    if (!exists) callback ("File does not exist");
    else{
      fs.unlink(path.join(dirname, filename), function(err){
        if (err) callback(err);
        else callback(err);
      });
    }
  });
};


/* modules.createDir takes 2 params with a required callback
 * @dirpath is the directory path the new directory will be located in
 * @dirname is the intended new directory name
 * The callback is executed on completion with params err
 * if no error, err will be null
 */
module.exports.createDir = function(dirpath, dirname, callback){
  var folder_path = path.join(dirpath, dirname);
    fs.mkdir(folder_path, function(err){
      if (err) callback(err);
      else callback();
    });
};


