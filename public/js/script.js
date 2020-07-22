const verifyErrsAlert = elements => {

    elements.forEach(element => {

        if ($(element).is(":visible")) {

            switch (element) {

                case "#errs":
                    setTimeout(() => {
                        $(element).css("display", "none");
                    }, 3000);
                    break;
                case "#successMSG":

                    setTimeout(() => {
                        $(element).css("display", "none");
                    }, 3000);
                    break;

                default:
                    break;
            }

        }
    });

}

const elements = [
    "#errs",
    "#successMSG"
];


verifyErrsAlert(elements);

const confirmarDelecao = (event, form) => {
    event.preventDefault();

    const decision = confirm("Deseja realmente excluir tua conta?");

    if (decision) {
        form.submit();
    }
}