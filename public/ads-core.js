console.log('I am the ads core script');

globalThis.fakeAdserver = {
  insertAdIntoDiv(id) {
    fetch(`https://fake-ad-server.herokuapp.com/ad`, {
      credentials: 'include',
    })
      .then((res) => res.text())
      .then((path) => {
        const iframe = document.createElement('iframe');
        iframe.style.border = 'none';
        iframe.style.height = '500px';
        iframe.style.width = '500px';
        iframe.src = `https://fake-ad-server.herokuapp.com/${path}`;
        let element = document.getElementById(id);
        element.appendChild(iframe);
        console.log('Ad inserted');
      });
  },
};
