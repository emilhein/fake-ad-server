console.log('I am the ads core script');

globalThis.fakeAdserver = {
  insertAdIntoDiv(id) {
    const src = fetch(`https://fake-ad-server.herokuapp.com/ad`).then((res) =>
      res.text()
    );

    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = src;
    let element = document.getElementById(id);
    element.appendChild(iframe);
    console.log('Ad inserted');
  },
};
