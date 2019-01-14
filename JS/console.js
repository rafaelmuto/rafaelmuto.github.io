window.onload = function () {
  let cmd_line = document.getElementById('cmd_line');
  let print_out = document.getElementById('print');
  let input = document.getElementById('input');

  var ln = 0;

  const lorem = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

  document.addEventListener('keydown', () => {
    cmd_line.focus();
  });

  cmd_line.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
      input.style.display = "none";
      cmd = cmd_line.value;
      print_line('>>' + cmd);
      cmd_line.value = '';
      cmdLoader(cmd);
      window.scrollTo(0, document.body.scrollHeight);
    }
  });

  const cmdLoader = (string) => {
    switch (string) {

      case 'cv':
        cmdLoader('about');
        cmdLoader('academics');
        cmdLoader('expant');
        break;

      case 'help':
        print_line('=================');
        print_line('List of Commands:');
        print_line('=================');
        print_line('CLS or CLEAR to clear screen.');
        print_line('TIME for standard UNIX time.');
        print_line('RESET or RELOAD to reload the page.');
        break;

      case 'about':
        print_line('=====');
        print_line('ABOUT');
        print_line('=====');
        print_line('Desenvolvedor fullstack com conhecimentos em HTML5, CSS3, JavaScript, PHP, SQL, JQuery e Laravel, recem formado na DigitalHouse SP. Graduado em arquitetura e urbanismo (FAU-USP),  z meu trabalho  nal na área de design paramétrico e fabricação digital aplicados ao design de mobiliário, onde utilizei ferramentas de programação e robotica na fabricação de mobiliários. Estudei e trabalhei com fotogra a, edição de video, marcenaria e design de mobiliário. Experiência com softwares de design e arquitetura (autoCAD, sketch-up, rhinoceros, grasshopper, fusion 360), modelagem 3d (blender), Photoshop, Indesign, Illustrator, Premiere, After E ects e Ligthroom.');
        break;

      case 'academics':
        print_line('=========');
        print_line('ACADEMICO');
        print_line('=========');
        print_line('[2018] DigitalHouse São Paulo - Desenvolvedor FullStack');
        print_line('[2011~2017] Faculdade de Arquitetura e Urbanismo na FAU-USP');
        print_line('[2008~2011] Engenharia Civil na Escola Politécnica USP (EPUSP)');
        break;

      case 'expant':
        print_line('=======================');
        print_line('EXPERIÊNCIAS ANTERIORES');
        print_line('=======================');
        print_line('2017 - Estudio Flecha - estagio em design de moveis');
        print_line('2014 - Imã Foto Galeria - edição de vídeo e mídia social');
        print_line('2012 - Dworecki Studio - assistente técnico');
        print_line('2010 - GAFISA S/A - estagiário em eng. civil');
        print_line('2007 - CSU Card System S/A - operador');
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
        type_line(lorem, returnInput);
        break;

      case 'reset':
        location.reload();
        break;

      case 'reload':
        location.reload();
        break;

      case 'ln':
        print_line('LN' + ln);
        break;

      default:
        print_line('ERROR: ' + cmd + ' is not a command.');
    }
  }


  const print_line = (string) => {
    ln++;
    let line = document.createTextNode(string);
    let new_line = document.createElement('p');
    new_line.appendChild(line);
    new_line.id = 'LN' + ln;
    print_out.appendChild(new_line);
    input.style.display = "grid";
  }

  const type_line = (string, cb) => {
    ln++;
    let new_line = document.createElement('p');
    print_out.appendChild(new_line).id = 'LN' + ln;
    new_line = document.getElementById('LN' + ln);
    var i = 0;
    let timer = setInterval(() => {
      new_line.innerHTML = string.slice(0, i);
      i++;
      if (i > string.length) {
        clearInterval(timer);
        cb();
      }
    }, 10);
  }

  const returnInput = () => {
    input.style.display = "grid";
  }

}