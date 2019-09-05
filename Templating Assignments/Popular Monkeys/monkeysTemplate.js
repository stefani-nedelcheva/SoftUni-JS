$(() => {
    loadMonkeys();

    async function loadMonkeys() {
        let allMonkeysHTML = await $.ajax({
            url: './allMonkeys.html'
        });
        let monkeyHTML = await $.ajax({
            url: './monkey.html'
        });
        let allMonkeysTemplate = Handlebars.compile(allMonkeysHTML);
        let monkeyTemplate = Handlebars.compile(monkeyHTML);
        let context = {
            monkeys
        };
        Handlebars.registerPartial('monkey', monkeyTemplate);
        $('div.monkeys').html(allMonkeysTemplate(context));
    }
});

function showInfo(id) {
    $(`#${id}`).toggle();
}
