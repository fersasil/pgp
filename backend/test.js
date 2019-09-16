
const Event = require("./models/Event");


async function teste(){
    try{
        const rows = await Event.findEventByTitle({
            name: "Teste",
            id: "15"
        });
        const res = [...rows];
        console.log(res);
    }
    catch(err){
        console.log(err);
    }
}

teste();
