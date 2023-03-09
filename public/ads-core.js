console.log('I am the ads core script');

globalThis.fakeAdserver = {
  insertAdIntoDiv(id) {
    fetch(`https://fake-ad-server.herokuapp.com/ad`)
      .then((res) => res.text())
      .then((url) => {
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = url;
        let element = document.getElementById(id);
        element.appendChild(iframe);
        console.log('Ad inserted');
      });
  },
};
