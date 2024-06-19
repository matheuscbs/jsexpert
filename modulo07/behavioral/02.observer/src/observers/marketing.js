export default class Marketing {
  update({ id, userName }) {
    // importante lembrar que o [update] é um responsável por gerenciar seus errors/exceptions
    // nao deve-se ter await no notify porque a responsabilidade é só emitir eventos
    // só notificar todo mundo
    console.log(
      `[${id}]: [marketing] will send an welcome email to [${userName}]`
    );
  }
}
