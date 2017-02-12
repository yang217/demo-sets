/**
 * Created by leonard on 2017/2/12.
 */

function getJson(url) {
  let promise = new Promise(function (resolve, reject) {
    let client = new XMLHttpRequest();
    client.open('GET', url);
    client.onreadystatechange = handler;
    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.send();

    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        resolve(this.response);
      }
      else {
        resolve(new Error(this.status + ': ' + this.statusText));
      }
    }
  })
}

// usage
getJson('/posts.json').then(function (json) {
  console.log('contents: ' + json);
}).catch(function (err) {
  console.log(err);
});