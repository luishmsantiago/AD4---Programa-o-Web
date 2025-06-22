function createFooter() {
  const footer = document.createElement('footer');
  footer.className = 'rodape'; // classe para aplicar estilo depois
  footer.innerHTML = `
    <p>Instituto Federal Catarinense - Campus Camboriú</p>
    <p>Curso: Sistemas para Internet</p>
    <p>Disciplina: Programação Web</p>
    <p>Professor: Rafael Speroni</p>
    <p>Aluno: Luis Henrique</p>
    <a href="https://crud-prof-web.vercel.app/" class="logo-vercel" target="_blank">
      Acesse a atividade pela Vercel
    </a>

    `;
  document.body.appendChild(footer);
}

createFooter();