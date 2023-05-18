var RNFS = require('react-native-fs');

export const sendData = (user, url) => {
  var file = [
    {
      name: 'file',
      filename: 'file',
      filepath: RNFS.DocumentDirectoryPath.replace('files', 'databases/default.db'),
      filetype: 'json'
    }
  ];

  RNFS.uploadFiles({
    toUrl: url + '/upload',
    files: file,
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'User' : user
    }
  }).promise.then((response) => {
    if (response.statusCode == 200) {
      console.log('FILES UPLOADED!');
    } else {
      console.log('SERVER ERROR');
    }
  })
    .catch((err) => {
      if (err.description === "cancelled") {
        // cancelled by user
      }
      console.log(err);
    });
}