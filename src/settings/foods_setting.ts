const foods_setting = [{
        text: "りんご",
        name: "ringo",
        images: [{
            image_name: "ringo",
            path: "assets/img/foods/ringo.png"
        }],
        effect : [
            {target: 'health', operation: '+', value: 1},
        ]
    },
    {
        text: "おんな",
        name: "girl",
        images: [{
            image_name: "girl",
            path: "assets/img/foods/girl.png"
        }],
        effect : [
            {target: 'eros', operation: '+', value: 2},
            {target: 'intelligence', operation: '-', value: 1},
            {target: 'music', operation: '-', value: 1},
        ]
    },
    {
        text: "きょうかしょ",
        name: "kyoukasyo",
        images: [{
            image_name: "kyoukasyo",
            path: "assets/img/foods/kyoukasyo.png"
        }],
        effect : [
            {target: 'intelligence', operation: '+', value: 2},
            {target: 'eros', operation: '-', value: 1},
            {target: 'gag', operation: '-', value: 1},
        ]
    },
    {
        text: "コーラ",
        name: "cola",
        images: [{
            image_name: "apple",
            path: "assets/img/foods/cola.png"
        }],
        effect : [
            {target: 'health', operation: '-', value: 2},
            {target: 'cola', operation: '+', value: 1},
        ]
    },
    {
        text: "ＣＤ",
        name: "cd",
        images: [{
                image_name: "cd_0",
                path: "assets/img/foods/cd_0.png",
            },
            {
                image_name: "cd_1",
                path: "assets/img/foods/cd_1.png",
            },
            {
                image_name: "cd_2",
                path: "assets/img/foods/cd_2.png",
            },
            {
                image_name: "cd_3",
                path: "assets/img/foods/cd_3.png",
            },
            {
                image_name: "cd_4",
                path: "assets/img/foods/cd_4.png",
            },
            {
                image_name: "cd_5",
                path: "assets/img/foods/cd_5.png"
            },
        ],
        effect : [
            {target: 'music', operation: '+', value: 2},
            {target: 'gag', operation: '-', value: 1},
            {target: 'health', operation: '-', value: 1},
        ]
    },
    {
        text: "テレビ",
        name: "tv",
        images: [{
            image_name: "tv",
            path: "assets/img/foods/tv.png"
        }],
        effect : [
            {target: 'gag', operation: '+', value: 2},
            {target: 'intelligence', operation: '-', value: 1},
            {target: 'eros', operation: '-', value: 1},
        ]
    },
    {
        text: "くすり",
        name: "kusuri",
        images: [{
            image_name: "kusuri",
            path: "assets/img/foods/kusuri.png"
        }],
        effect : [
            {target: 'health', operation: '+', value: 10},
            {target: 'kusuri', operation: '+', value: 1},
        ]
    },
]

export default foods_setting;