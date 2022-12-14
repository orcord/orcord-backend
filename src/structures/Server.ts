import Rest from "../rest/";
import Database from "../database";
import config from "../../config.json";
import Actions from "../database/actions";
module.exports = class Server {
    rest: Rest;
    db: Database;
    config: typeof config;

    constructor(){
        logger.info("Initialising Server", __filename, "Server");
        this.rest = new Rest();
        this.db = new Database();
        this.config = config;


        (async (db, config) => {

            await db.connect(
                config.database.main.url,
                config.database.main.username,
                config.database.main.password,
                config.database.main.protocol
            );
        })(this.db, this.config);

        this.startRest(
            this.config.rest.ip,
            this.config.rest.port
        );
        (async (_db) => {
            // const actions = new Actions();
            // await actions.guild.createGuild(db, "G_2345671234564", "U_123456787654");
            // await actions.guild.create_channel(db, "G_2345671234564", "C_81123456", "General chat", "text");
            // await actions.guild.add_user_to_guild(db, "G_2345671234564", "U_123456787654");
            // await actions.user.createUser( db, "U_192384732819", "MCorange", "6969", "12b33123", "019238924rgbhfn23fg", "https://mcorangehq.xyz/", "K_012398439132483291383", true );
            // const channel = await db.channelSchema.findOne({_id: "C_81123456"});
            // const user = await db.userSchema.findOne({_id: "U_192384732819"});
            // actions.user.sendTextMessage(db, channel, user, "HEnlo!");
            // return;

        });//(this.db);
    }



    startRest(ip: string, port: number){
        logger.info(logger.color("Starting Rest api"), __filename, "Server");
        this.rest.listen(ip, port);
        return;
    }

};