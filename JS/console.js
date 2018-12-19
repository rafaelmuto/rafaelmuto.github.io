window.onload = function() {
  let cmd_line = document.getElementById('cmd_line');
  let print_out = document.getElementById('print');

  let lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  document.addEventListener('keydown', function() {
    cmd_line.focus();
  });

  cmd_line.addEventListener('keydown', function(e) {
    if (e.key == 'Enter') {
      cmd = cmd_line.value;
      print_line(cmd);
      cmd_line.value = '';
      loader(cmd);
    }
  });

  function loader(string) {
    switch (cmd) {
      case 'help':
        print_line('=================');
        print_line('List of Commands:');
        print_line('=================');
        print_line('CLS or CLEAR to clear screen.');
        print_line('TIME for standard UNIX time.');
        print_line('LOREM for lorem ipsum test.');
        print_line('RESET or RELOAD to reload the page.');
        print_line('LS for a list of directories.')
        break;

      case 'about':
        print_line('=====');
        print_line('ABOUT');
        print_line('=====');
        print_line('Desenvolvedor FullStack || fotografo || formado em arquitetura & urbanismo pela FAU-USP || trabalhando com fabricação digital || experimentando com linguagens digitais e eletrônica analógica ||  guitarrista amador || aprendendo o zen e a arte de manutenção de motocicletas.');
        break;

      case 'academics':
        print_line('=========');
        print_line('ACADEMICO');
        print_line('=========');
        print_line('[2018] DigitalHouse São Paulo - Desenvolvedor FullStack');
        print_line('[2011~2017] Faculdade de Arquitetura e Urbanismo na FAU-USP');
        print_line('[2008~2011] Engenharia Civil na Escola Politécnica USP (EPUSP)');
        break;

      case 'clear':
        print_out.innerHTML = '';
        break;

      case 'cls':
        print_out.innerHTML = '';
        break;

      case 'time':
        let d = new Date();
        let time = d.getTime();
        print_line('Its been ' + time + 'ms since midnight January 1, 1970.');
        break;

      case 'lorem':
        print_line(lorem);
        break;

      case 'reset':
        location.reload();
        break;

      case 'reload':
        location.reload();
        break;

      default:
        print_line('ERROR: ' + cmd + ' is not a command.')
    }
  }

  function print_line(string) {
    let line = document.createTextNode(string);
    let new_line = document.createElement('p');
    new_line.appendChild(line);
    print_out.appendChild(new_line);
  }
}