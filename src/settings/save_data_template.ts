const save_data_template = {
    format_virsion: "0.0.2",
    data: {
        player: {
            chara: "tamago",
            stage: 0,
            status: "hutsuu", // [genki, hutsuu, haraheri, dokuro]
            parameter: {
                health: 25,
                intelligence: 0,
                music: 0,
                eros: 0,
                gag: 0,
                cola: 0,
                kusuri: 0,
            },
        },
        time: {
            start: null,
            last_evolution: null,
            last_meal: null,
            // last_meal: 1683727744267,
            last_clean: null,
        },
        unko: [],
    },
};
export default save_data_template;
