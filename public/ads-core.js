console.log('I am the ads core script');

globalThis.fakeAdserver = {
  insertAdIntoDiv(id) {
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.src = 'https://fake-ad-server.herokuapp.com/ad';
    let element = document.getElementById(id);
    element.appendChild(iframe);
    console.log('Ad inserted');
  },
};
