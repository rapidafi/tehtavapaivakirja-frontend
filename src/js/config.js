'use strict';

/* CONFIG
 * split into two:
 * - instance selectable values which are set earlier into variable INSTANCE_CONFIG
 * - the values that are same for all are in this file below
 *
 * We use jQuery function extend (deep) to unite the two:
 * - https://api.jquery.com/jquery.extend/#jQuery-extend-deep-target-object1-objectN
 * So, jQuery must be available at this point!
 */
let CONFIG = {};
$.extend(true,CONFIG,{
    studypathfullURI: '../api/studypathfull.php/',//fix according to environment
    studypathURI: '../api/studypath.php/',//fix according to environment
    moduleURI: '../api/module.php/',//fix according to environment
    assignmentURI: '../api/assignment.php/',//fix according to environment
    submissionURI: '../api/submission.php/',//fix according to environment
    /*->instance
    languages: {
        'fi':'Suomeksi',
        //'en':'In English'
    },
    "updateInterval":5,
    //*/

    i18n: {
        title:'Tehtäväpäiväkirja',
        headline:{
            title:{
                fi:'Tehtäväpäiväkirja',
                en:'[en]Tehtäväpäiväkirja'
            },
            logout:{
                fi:'Kirjaudu ulos',
                en:'Sign out'
            },
            config:{
                fi:'Asetukset',
                en:'Settings',
                lang:{
                    fi:'Sivuston kieli',
                    en:'Language'
                }
            }
        },

        studypath:{
            advancement:{
                follow:{
                    fi:'Seuraa etenemistä',
                    en:'Follow advancement'
                }
            },
            criteria:{
                edit:{
                    fi:'Muokkaa kriteerejä',
                    en:'Edit criteria'
                }
            },
            student:{
                add:{
                    fi:'Lisää opiskelijoita',
                    en:'Add students'
                }
            }
        },
        module:{

        },
        assignment:{
            edit:{
                fi:'Muokkaa',
                en:'Edit'
            },
            add:{
                fi:'Lisää tehtävä',
                en:'Add assignment'
            }
        }
    }
}
,INSTANCE_CONFIG);//-extend
