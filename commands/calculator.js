const { calculator } = require("simply-djs");

module.exports = {
    name: "계산기",
    description: "버튼 계산기",
    execute(message){
        try{
            calculator(message, {
                embedColor: "bule"
            })
        }catch(error){
            message.reply(`오류가 발생했습니다. ${error}`)
        }
    }
}