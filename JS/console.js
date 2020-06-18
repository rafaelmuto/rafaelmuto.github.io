window.onload = () => {
  const input = document.getElementById('input');
  const cmd_line = document.getElementById('cmd_line');
  const print_out = document.getElementById('print');

  let ln = 0;

  const lorem =
    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  document.addEventListener('keydown', () => {
    cmd_line.focus();
  });

  cmd_line.addEventListener('keydown', e => {
    if (e.key == 'Enter') {
      input.style.display = 'none';
      cmd = cmd_line.value;
      print_line(cmd);
      cmd_line.value = '';
      cmdLoader(cmd);
      window.scrollTo(0, document.body.scrollHeight);
    }
  });

  // print entered cmd:
  const print_line = string => {
    ln++;
    let line = document.createTextNode('>>' + string);
    let new_line = document.createElement('p');
    new_line.appendChild(line);
    new_line.id = 'LN' + ln;
    print_out.appendChild(new_line);
  };

  // printer function:
  const printer = string => {
    const speed = 10;
    ln++;
    let i = 0;

    let new_line = document.createElement('p');
    print_out.appendChild(new_line).id = 'LN' + ln;
    new_line = document.getElementById('LN' + ln);

    const typer = new Promise(resolve => {
      let timer = setInterval(() => {
        new_line.innerHTML = string.slice(0, i);
        i++;
        if (i > string.length) {
          clearInterval(timer);
          resolve('typer resolved');
        }
      }, speed);
    });

    typer.then(res => {
      // console.log(res);
      input.style.display = 'grid';
    });
  };

  // cmdLoader List:
  const cmdLoader = string => {
    switch (string) {
      case 'lorem':
        printer(lorem);
        break;

      case 'help':
        printer('List of Commands:');
        printer('CV => CURRICULUN VITAE rafaelmuto');
        printer('CON => contact info');
        printer('TIME for standard UNIX time.');
        printer('CANNON => jogo do canhão');
        printer('CLS or CLEAR to clear screen.');
        printer('RESET or RELOAD to reload the page.');
        break;

      case 'con':
        printer('email: r.nagahama@gmail.com');
        printer('mobile: +55 11 947 256 697');
        printer('GitHub: https://github.com/rafaelmuto');
        printer('portifolio: https://cargocollective.com/rafaelmuto');
        break;

      case 'clear':
        print_out.innerHTML = '';
        input.style.display = 'grid';
        break;

      case 'cls':
        print_out.innerHTML = '';
        input.style.display = 'grid';
        break;

      case 'time':
        let d = new Date();
        let time = d.getTime();
        printer('Its been ' + time + 'ms since midnight January 1, 1970.');
        break;

      case 'reset':
        location.reload();
        break;

      case 'reload':
        location.reload();
        break;

      case 'ln':
        let lnp = ln + 1;
        printer('LN' + lnp);
        break;

      case 'cannon':
        printer('game...');
        location.assign('cannon/index.html');
        break;

      case 'ring':
        printer('this is a colorfull ring...');
        location.assign('HTML/ring.html');
        break;

      case 'cv':
        location.assign('Files/rafaelmuto_CV.pdf');
        break;

      default:
        printer('ERROR: ' + cmd + ' is not a command.');
    }
  };
};
