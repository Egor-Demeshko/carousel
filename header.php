<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Web Page</title>
    <style>
        :root {
            --background: #F6F6F6;
            --main-dark: #36AA00;
            --main: #97E572;
            --semi-main: #99E675;
            --second_menu_gradient: #73B156; 
            --light: #E7FCDB;
            --grey: #D9D9D9;
            --grey-dark: #919191;
            --accent: #77003e;
            --black: #000000;
            --black-80: #000000CC;
            --white: #FFFFFF;
            --slide-background: #36AA0033;
            --shadow: #000000A1;
            
            --first-green-gradient: #97E572B3; /*70%*/
            --secondary-green-gradient: #97E5724D;
            
            
            --background-dark: #0D0D0D;
            --black-gradient-first: #8F8F8F;
            --black-gradient-second: #C1C1C173;
            
            --main-green-gradient: linear-gradient(-90deg, var(--first-green-gradient), var(--secondary-green-gradient));
            --grey-gradient: linear-gradient(-90deg, var(--black-gradient-first), var(--black-gradient-second));
            --menu-gradient: linear-gradient(-90deg, var(--main), var(--second_menu_gradient));

            --step: clamp(3rem, 20vw, 6.26rem);
            --bottombar-height: 4.375rem;
        }

        *{
            box-sizing: border-box;
        }

        body{
            background-color: var(--background);
        }

        .header-post{
            display: flex;
            padding: clamp( 1.125rem, 1.7vw, 1.5rem);
            background-color: var(--black-80);
            width: clamp(min(100%, 56rem), 66vw, 66vw);
            color: var(--background);
            position: fixed;
            top: 0;
            left: 50%;
            transform: translate(-50%);
        }.header-post__menu{
            display: flex;
        }.header-post__list{
            display: flex;  
        }


        .banner{
            width: 100%;
            height: 19.875rem;
            position: relative;
        }

        .banner__title{
            font-size: 2rem;
            padding: clamp(.875rem, 2.2vw, 1.375rem);
            width: 45%;
            border-radius: 10px;
            color: var(--background);
        }
        .banner__title_wrapper{
            display: flex;
            justify-content: end;
            position: absolute;
            width: clamp(min(72%, 56rem), 66vw, 66vw);
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 50%);
        }

        .main__header{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .main__wrapper{
            max-width: 63.75rem;
        }

        .main__breadcrumbs{
            display: flex;
            gap: 1rem;
            align-items: center;
        }

        .main__home{
            padding: .875rem;
        }

        .main__rubrics{
            padding: .5rem 1.375rem;
        }

        @media screen and (max-width: 800px){
            header.header-post{
                background-color: var(--main-dark);
                left: 0;
                transform: translate(0);
                width: 100%;
                z-index: 100;
                border-radius: 0;
            }
            .header-post__menu nav{
                display: none;
            }
        }

        @media screen and (max-width: 500px){
            div.main_flow{
                display: flex;
                flex-direction: column;
            }
            aside.main_flow__aside{
                width: 100%;
                position: fixed;
                top: 0;
                left: 50%;
                transform: translate(-150%);
                z-index: 101;
            }

            .banner{
                max-height: 16.8rem;
            }
            h1.banner__title{
                width: 100%;
                text-align: center;
            }
            .banner__title_wrapper{
                transform: translate(-50%, -2.8rem);
            }

            div.main{
                padding: 0 1.125rem 4.375rem;
            }

            /*BREADCRUMBS block*/
            header.main__header{
                position: relative;
                transform: translateY(-50%);
                justify-content: center;
            }
            div.main__author_info{
                position: absolute;
                bottom: -3rem;
                flex-direction: row;
            }
            /* -- END of BREADCRUMBS -- */
        }
    </style>
    <link rel="stylesheet" href="/assets/css/post/style.css"/>
</head>
<body>