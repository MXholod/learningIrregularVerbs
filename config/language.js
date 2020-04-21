module.exports = {
	"ru":{
		"settingsPanel":{
			"basePanelText":["Мои","Настройки"],
			"basePanel": {
				"language":{
					"header":"Язык интерфейса",
					"languageLabel":["Рус","Укр"],
				},
				"music":{
					"header":"Музыка",
					"musicState":["Вкл.","Выкл."]
				},
				"user":{
					"header":"Привет",
					"button":"Перейти к профилю"
				}
				
			}
		},
		"mainpage":{
			"auth":{
				"formTitle":"Выполните регистрацию",
				"firstControl":{
					"labelTitle":["Введите имя","из (3-7 символов)"],
					"warningInput":"Неверный формат имени!",
					"inputValue":"Ваше имя"
				},
				"secondControl":{
					"labelTitle":["Введите пароль","из (5-7 символов)"],
					"warningInput":"Неверный формат пароля!",
					"placeHolder":"Ваш пароль"
				},
				"submit":"Отправить",
				"forgetPassLabel":"Забыли пароль?"
			},
			"authRestore":{
				"networkConnectionError":"Нет подключения к сети.",
				"absentUserByEmail":"Пользователь с таким почтовым адресом не зарегистрирован..",
				"emailSuccessfullySent":"Логин и пароль отправлены на почту.",
				"loadingProcess":"Обработка данных...",
				"shortDescription":"На введённый Вами адрес почты будет выслан новый пароль.",
				"legendRestore":"Восстановление пароля",
				"emaillRestore":"Введите адрес почты, которую вы сохранили в профиле",
				"submitRestore":"Отправить почту",
				"submitValueRestore":"Отправить",
				"hideRestorePanel":"Вернуться",
			}
		},
		"profile":{
			"profileMenu":["Настройки профиля","Результаты упражнения 1","Результаты упражнения 2","Результаты упражнения 3"],
			"profileLeftColumn":["Теперь ты в игре!","Перейти к обучению"],
			"authors":{
				"header":"Авторы",
				"text":"Информация об авторах программы",
				"link":"Подробнее..."
			},
			"profileSmokeBlock":{
				"headerWarning":"Текущие данные профиля будут перезаписаны!",
				"buttonRefuse":"Отклонить",
				"buttonAccept":"Подтвердить",
				"messageWrong":"Что-то пошло не так!",
				"messageCorrect":"Данные успешно отправлены!"
			},
			"profileUserData":{
				"settingsHeader":"Настройки профиля",
				"changeLog":"Изменить логин",
				"changePass":"Изменить пароль",
				"sendEmail":"Ваш адрес почты на который будет отправлен пароль в случае если вы его забудите",
				"saveEmail":"Если вы введёте адрес почты то у вас будет возможность восстановить пароль в случае потери",
				"submitHeader":"Сохранить введённые данные",
				"submitButton":"Отправить"
			},
			"profileUserVerbList":{
				"lastVisitText":"Дата Вашего последнего посещения:",
				"verbListText":"Список неправильных глаголов для изучения.",
				"goToListText":"Перейти к списку"
			}
		},
		"verbsListToProfile":{
			"toListVerbs":{
				"buttonTitle":"Вернуться к профилю"
			}
		},
		"verbsListTop":{
			"bothListHeaders":{
				"fullListHeader":"неправильных глаголов одним списком.",
				"fullListButton":"Список целиком",
				"portionListHeader":"Неправильные глаголы порциями.",
				"portionListButton":"Список порциями."
			},
			"fullListTableHeader":["1-я форма","2-я форма","3-я форма"],
			"portionListTableHeader":["1-я форма","2-я форма","3-я форма"]
		},
		"exerciseButtonToProfile":{
			"toProfileExercises":{
				"buttonTitle":"Вернуться к профилю"
			}
		},
		"exercises":{
			"exerciseItems":{
				"exercise1":[
					"Упражнение 1",
					"Соответствие переводу.",
					"Дана одна попытка, чтобы отметить строку, в которой отсутствует ошибка  (английские глаголы не спутаны в соответствии с переводом c глаголами из других строк).",
					"Начать"
				],
				"exercise2":[
					"Упражнение 2",
					"Соответствие структуре.",
					"Определить, находятся ли глаголы в строке на своих местах. Дана одна попытка, чтобы отметить строку или пропустить её.",
					"Начать"
				],
				"exercise3":[
					"Упражнение 3",
					"Произвести перестановку.",
					"Необходимо переставить неправильные глаголы на свои места согласно переводу.",
					"Начать"
				]
			}
		},
		"methodsHeader":{
			"infoPanelPage":{
				"infoPanelPageHeader":"Страница"
			},
			"infoPanelTimer":{
				"infoPanelPageTimer":"Осталось времени:"
			}
		},
		"resultPage":{
			"resultTable":{
				"captionHeader":{"header":"Табло Упражнения"},
				"theadHeader":{
					"player":"Игрок:",
					"passedPages":"Пройдено страниц:",
					"timeLeft":"Осталось времени:"
				},
				"variantsOne":{
					"correct":"Верные варианты:",
					"total":"Всего выбрано вариантов:"
				},
				"variantsTwo":{
					"incorrect":"Неверные варианты:"
				},
				"progressSuccess":{
					"text":"Прогресс успешности пройденного упражнения"
				}
			}
		},
		"underResultTable":{
			"resultTableButton":{
				"button":{
					"value":"Перейти на страницу профиля"
				}
			}
		},
		"failedResults":{
			"pageInfo1":{
				"exercise":"Упражнение",
				"page":"Страница"
			},
			"listC1":{
				"items":[
					{
						"dateOfPassage":"Дата прохождения:",
						"rightOptions":"Правильные варианты:",
						"wrongOptions":"Неправильные варианты:",
						"totalOptions":"Всего вариантов:",
						"restPlayingTime":"Остаток игрового времени:",
						"successRate":"Процент успешности:",
						"viewNotGuessed":"Просмотреть не угаданные"
					},
					{
						"dateOfPassage":"Дата прохождения:",
						"rightOptions":"Правильные варианты:",
						"wrongOptions":"Неправильные варианты:",
						"totalOptions":"Всего вариантов:",
						"restPlayingTime":"Остаток игрового времени:",
						"successRate":"Процент успешности:",
						"viewNotGuessed":"Просмотреть не угаданные"
					},
					{
						"dateOfPassage":"Дата прохождения:",
						"rightOptions":"Правильные варианты:",
						"wrongOptions":"Неправильные варианты:",
						"totalOptions":"Всего вариантов:",
						"restPlayingTime":"Остаток игрового времени:",
						"successRate":"Процент успешности:",
						"viewNotGuessed":"Просмотреть не угаданные"
					},
					{
						"dateOfPassage":"Дата прохождения:",
						"rightOptions":"Правильные варианты:",
						"wrongOptions":"Неправильные варианты:",
						"totalOptions":"Всего вариантов:",
						"restPlayingTime":"Остаток игрового времени:",
						"successRate":"Процент успешности:",
						"viewNotGuessed":"Просмотреть не угаданные"
					},
					{
						"dateOfPassage":"Дата прохождения:",
						"rightOptions":"Правильные варианты:",
						"wrongOptions":"Неправильные варианты:",
						"totalOptions":"Всего вариантов:",
						"restPlayingTime":"Остаток игрового времени:",
						"successRate":"Процент успешности:",
						"viewNotGuessed":"Просмотреть не угаданные"
					}
				]
			},
			"pageInfo2":{
				"exercise":"Упражнение",
				"page":"Страница"
			},
			"listC2":{
				"items":[
					{
						"dateOfPassage":"Дата прохождения:",
						"rightOptions":"Правильные варианты:",
						"wrongOptions":"Неправильные варианты:",
						"totalOptions":"Всего вариантов:",
						"restPlayingTime":"Остаток игрового времени:",
						"successRate":"Процент успешности:",
						"viewNotGuessed":"Просмотреть не угаданные"
					},
					{
						"dateOfPassage":"Дата прохождения:",
						"rightOptions":"Правильные варианты:",
						"wrongOptions":"Неправильные варианты:",
						"totalOptions":"Всего вариантов:",
						"restPlayingTime":"Остаток игрового времени:",
						"successRate":"Процент успешности:",
						"viewNotGuessed":"Просмотреть не угаданные"
					},
					{
						"dateOfPassage":"Дата прохождения:",
						"rightOptions":"Правильные варианты:",
						"wrongOptions":"Неправильные варианты:",
						"totalOptions":"Всего вариантов:",
						"restPlayingTime":"Остаток игрового времени:",
						"successRate":"Процент успешности:",
						"viewNotGuessed":"Просмотреть не угаданные"
					},
					{
						"dateOfPassage":"Дата прохождения:",
						"rightOptions":"Правильные варианты:",
						"wrongOptions":"Неправильные варианты:",
						"totalOptions":"Всего вариантов:",
						"restPlayingTime":"Остаток игрового времени:",
						"successRate":"Процент успешности:",
						"viewNotGuessed":"Просмотреть не угаданные"
					},
					{
						"dateOfPassage":"Дата прохождения:",
						"rightOptions":"Правильные варианты:",
						"wrongOptions":"Неправильные варианты:",
						"totalOptions":"Всего вариантов:",
						"restPlayingTime":"Остаток игрового времени:",
						"successRate":"Процент успешности:",
						"viewNotGuessed":"Просмотреть не угаданные"
					}
				]
			},
			"pageInfo3":{
				"exercise":"Упражнение",
				"page":"Страница"
			},
			"listC3":{
				"items":[
					{
						"dateOfPassage":"Дата прохождения:",
						"rightOptions":"Правильные варианты:",
						"wrongOptions":"Неправильные варианты:",
						"totalOptions":"Всего вариантов:",
						"restPlayingTime":"Остаток игрового времени:",
						"successRate":"Процент успешности:",
						"viewNotGuessed":"Просмотреть не угаданные"
					},
					{
						"dateOfPassage":"Дата прохождения:",
						"rightOptions":"Правильные варианты:",
						"wrongOptions":"Неправильные варианты:",
						"totalOptions":"Всего вариантов:",
						"restPlayingTime":"Остаток игрового времени:",
						"successRate":"Процент успешности:",
						"viewNotGuessed":"Просмотреть не угаданные"
					},
					{
						"dateOfPassage":"Дата прохождения:",
						"rightOptions":"Правильные варианты:",
						"wrongOptions":"Неправильные варианты:",
						"totalOptions":"Всего вариантов:",
						"restPlayingTime":"Остаток игрового времени:",
						"successRate":"Процент успешности:",
						"viewNotGuessed":"Просмотреть не угаданные"
					},
					{
						"dateOfPassage":"Дата прохождения:",
						"rightOptions":"Правильные варианты:",
						"wrongOptions":"Неправильные варианты:",
						"totalOptions":"Всего вариантов:",
						"restPlayingTime":"Остаток игрового времени:",
						"successRate":"Процент успешности:",
						"viewNotGuessed":"Просмотреть не угаданные"
					},
					{
						"dateOfPassage":"Дата прохождения:",
						"rightOptions":"Правильные варианты:",
						"wrongOptions":"Неправильные варианты:",
						"totalOptions":"Всего вариантов:",
						"restPlayingTime":"Остаток игрового времени:",
						"successRate":"Процент успешности:",
						"viewNotGuessed":"Просмотреть не угаданные"
					}
				]
			}
		},
		"deleteMethodsData":{
			"methodDelete1":{
				"description":"Удалить результаты упражнения № 1",
				"buttonYes":"Да",
				"buttonNo":"Нет"
			},
			"methodDelete2":{
				"description":"Удалить результаты упражнения № 2",
				"buttonYes":"Да",
				"buttonNo":"Нет"
			},
			"methodDelete3":{
				"description":"Удалить результаты упражнения № 3",
				"buttonYes":"Да",
				"buttonNo":"Нет"
			},
			"methodDelete4":{
				"description":"Удалить все данные пользователя",
				"buttonYes":"Да",
				"buttonNo":"Нет"
			}
		},
		"singleBlockFailedResults":{
			"displayIfZeroFailed":{
				"congratulationTitle":"Поздравляем! Вы не допустили ни одной ошибки!"
			}
		},
		"authorsPage":{
			"toProfileAuthors":{
				"buttonTitle":"Вернуться к профилю"
			},
			"authorsHeader":{
				"titleHeader":"Авторы программы",
				"contentHeader":"Привет друг!",
				"contentCenter":"Изучение английского языка - это труд, труд над самим собой. Постоянная зубрёжка правил грамматики, а также заучивание слов иногда отбивают дальнейшее желание к обучению. Именно поэтому мы представляем программу для изучения английских неправильных глагов тремя разными способами.",
				"contentLast":"Будем рады помочь Вам в обучении."
			},
			"authorList1":{
				"author":"Автор: ",
				"authorName":"Михаил Холод (МХ)",
				"authorRole":"Роль: ",
				"authorRoleName":"Frontend Developer, UI/UX",
				"authorEmail":"Почта: ",
				"authorEmailName":"mishika@i.ua",
				"authorSite":"Сайт портфолио автора программы: ",
				"authorSiteName":"http://mikeportfolio.com.ua"
			},
			"authorList2":{
				"author":"Автор: ",
				"authorName":"Алёна Яворская",
				"authorRole":"Роль: ",
				"authorRoleName":"Junior Frontend Developer, UI/UX",
				"authorEmail":"Почта: ",
				"authorEmailName":"alenka@i.ua",
				"authorSite":"Сайт портфолио автора программы: ",
				"authorSiteName":"http://alenkaportfolio.com.ua"
			}
		},
		"serverSisdeOnly":{
			"emailRestoring":{
				"topic":"Восстановление пароля",
				"greeting":"Привет",
				"textBeforePassword":"твой новый пароль:",
				"textAfterPassword":"ты всегда можешь его изменить в разделе 'Настройка профиля'."
			}
		},
		"identifier":"rus"
	},
	"ua":{
		"settingsPanel":{
			"basePanelText":["Мої","налаштування"],
			"basePanel": {
				"language":{
					"header":"Мова інтерфейсу",
					"languageLabel":["Рос","Укр"],
				},
				"music":{
					"header":"Музика",
					"musicState":["Увімк","Вимк"]
				},
				"user":{
					"header":"Вітаю",
					"button":"Перейти до профілю"
				}
				
			}
		},
		"mainpage":{
			"auth":{
				"formTitle":"Виконайте реєстрацію",
				"firstControl":{
					"labelTitle":["Введіть ім'я","з (3-7 символів)"],
					"warningInput":"Невірний формат імені!",
					"inputValue":"Ваше ім'я"
				},
				"secondControl":{
					"labelTitle":["Введіть пароль","з (5-7 символів)"],
					"warningInput":"Невірний формат пароля!",
					"placeHolder":"Ваш пароль"
				},
				"submit":"Відправити",
				"forgetPassLabel":"Забули пароль?"
			},
			"authRestore":{
				"networkConnectionError":"Немає підключення до мережі.",
				"absentUserByEmail":"Користувач з такою поштовою адресою не зареєстрований.",
				"emailSuccessfullySent":"Логін і пароль відправлені на пошту.",
				"loadingProcess":"Обробка даних...",
				"shortDescription":"На введену Вами адресу пошти буде висланий новий пароль.",
				"legendRestore":"Відновлення паролю",
				"emaillRestore":"Введіть адресу пошти, яку ви зберегли в профілі",
				"submitRestore":"Відправити пошту",
				"submitValueRestore":"Відправити",
				"hideRestorePanel":"Повернутися",
			}
		},
		"profile":{
			"profileMenu":["Налаштування профілю","Результати вправи 1","Результати вправи 2","Результати вправи 3"],
			"profileLeftColumn":["Тепер ти в грі!","Перейти до навчання"],
			"authors":{
				"header":"Автори",
				"text":"Інформація про авторів програми",
				"link":"Детальніше..."
			},
			"profileSmokeBlock":{
				"headerWarning":"Поточні дані профілю будуть перезаписані!",
				"buttonRefuse":"Відхилити",
				"buttonAccept":"Підтвердити",
				"messageWrong":"Щось пішло не так!",
				"messageCorrect":"Дані успішно відправлені!"
			},
			"profileUserData":{
				"settingsHeader":"Налаштування профілю",
				"changeLog":"Змінити логін",
				"changePass":"Змінити пароль",
				"sendEmail":"Ваша адреса електронної пошти на яку буде відправлений пароль в разі, якщо ви його забули",
				"saveEmail":"Якщо ви введете адресу пошти то у вас буде можливість відновити пароль в разі його втрати",
				"submitHeader":"Зберегти введені дані",
				"submitButton":"Відправити"
			},
			"profileUserVerbList":{
				"lastVisitText":"Дата Вашого останього відвідування.",
				"verbListText":"Перелік неправильних дієслів для вивчення.",
				"goToListText":"Перейти до переліку"
			}
		},
		"verbsListToProfile":{
			"toListVerbs":{
				"buttonTitle":"Повернутися до профілю"
			}
		},
		"verbsListTop":{
			"bothListHeaders":{
				"fullListHeader":"неправильних дієслів одним списком.",
				"fullListButton":"Список цілком",
				"portionListHeader":"Неправильні дієслова порціями.",
				"portionListButton":"Список порціями"
			},
			"fullListTableHeader":["1-ша форма","2-га форма","3-тя форма"],
			"portionListTableHeader":["1-ша форма","2-га форма","3-тя форма"]
		},
		"exerciseButtonToProfile":{
			"toProfileExercises":{
				"buttonTitle":"Повернутися до профілю"
			}
		},
		"exercises":{
			"exerciseItems":{
				"exercise1":[
					"Вправа 1",
					"Відповідність перекладу.",
					"Дана одна спроба, щоб відзначити рядок, в якій відсутній помилка (англійські дієслова не сплутані відповідно до перекладом c дієсловами з інших рядків).",
					"Почати"
				],
				"exercise2":[
					"Вправа 2",
					"Відповідність структурі.",
					"Визначити, чи знаходяться дієслова в рядку на своїх місцях. Дана одна спроба, щоб відзначити рядок або пропустити її.",
					"Почати"
				],
				"exercise3":[
					"Вправа 3",
					"Зробити перестановку.",
					"Необхідно переставити неправильні дієслова на свої місця згідно перекладу.",
					"Почати"
				]
			}
		},
		"methodsHeader":{
			"infoPanelPage":{
				"infoPanelPageHeader":"Сторінка"
			},
			"infoPanelTimer":{
				"infoPanelPageTimer":"Залишилося часу:"
			}
		},
		"resultPage":{
			"resultTable":{
				"captionHeader":{"header":"Табло Вправи"},
				"theadHeader":{
					"player":"Гравець:",
					"passedPages":"Пройдено сторінок:",
					"timeLeft":"Залишилося часу:"
				},
				"variantsOne":{
					"correct":"Вірні варіанти:",
					"total":"Всього вибрано варіантів:"
				},
				"variantsTwo":{
					"incorrect":"Невірні варіанти:"
				},
				"progressSuccess":{
					"text":"Прогрес успішності пройденої вправи"
				}
			}
		},
		"underResultTable":{
			"resultTableButton":{
				"button":{
					"value":"Перейти на сторінку профілю"
				}
			}
		},
		"failedResults":{
			"pageInfo1":{
				"exercise":"Вправа",
				"page":"Сторінка"
			},
			"listC1":{
				"items":[
					{
						"dateOfPassage":"Дата проходження:",
						"rightOptions":"Правильні варіанти:",
						"wrongOptions":"Неправильні варіанти:",
						"totalOptions":"Всього варіантів:",
						"restPlayingTime:":"Залишок ігрового часу:",
						"successRate":"Відсоток успішності:",
						"viewNotGuessed":"Переглянути не відгадані варіанти"
					},
					{
						"dateOfPassage":"Дата проходження:",
						"rightOptions":"Правильні варіанти:",
						"wrongOptions":"Неправильні варіанти:",
						"totalOptions":"Всього варіантів:",
						"restPlayingTime:":"Залишок ігрового часу:",
						"successRate":"Відсоток успішності:",
						"viewNotGuessed":"Переглянути не відгадані варіанти"
					},
					{
						"dateOfPassage":"Дата проходження:",
						"rightOptions":"Правильні варіанти:",
						"wrongOptions":"Неправильні варіанти:",
						"totalOptions":"Всього варіантів:",
						"restPlayingTime:":"Залишок ігрового часу:",
						"successRate":"Відсоток успішності:",
						"viewNotGuessed":"Переглянути не відгадані варіанти"
					},
					{
						"dateOfPassage":"Дата проходження:",
						"rightOptions":"Правильні варіанти:",
						"wrongOptions":"Неправильні варіанти:",
						"totalOptions":"Всього варіантів:",
						"restPlayingTime:":"Залишок ігрового часу:",
						"successRate":"Відсоток успішності:",
						"viewNotGuessed":"Переглянути не відгадані варіанти"
					},
					{
						"dateOfPassage":"Дата проходження:",
						"rightOptions":"Правильні варіанти:",
						"wrongOptions":"Неправильні варіанти:",
						"totalOptions":"Всього варіантів:",
						"restPlayingTime:":"Залишок ігрового часу:",
						"successRate":"Відсоток успішності:",
						"viewNotGuessed":"Переглянути не відгадані варіанти"
					}
				]
			},
			"pageInfo2":{
				"exercise":"Вправа",
				"page":"Сторінка"
			},
			"listC2":{
				"items":[
					{
						"dateOfPassage":"Дата проходження:",
						"rightOptions":"Правильні варіанти:",
						"wrongOptions":"Неправильні варіанти:",
						"totalOptions":"Всього варіантів:",
						"restPlayingTime:":"Залишок ігрового часу:",
						"successRate":"Відсоток успішності:",
						"viewNotGuessed":"Переглянути не відгадані варіанти"
					},
					{
						"dateOfPassage":"Дата проходження:",
						"rightOptions":"Правильні варіанти:",
						"wrongOptions":"Неправильні варіанти:",
						"totalOptions":"Всього варіантів:",
						"restPlayingTime:":"Залишок ігрового часу:",
						"successRate":"Відсоток успішності:",
						"viewNotGuessed":"Переглянути не відгадані варіанти"
					},
					{
						"dateOfPassage":"Дата проходження:",
						"rightOptions":"Правильні варіанти:",
						"wrongOptions":"Неправильні варіанти:",
						"totalOptions":"Всього варіантів:",
						"restPlayingTime:":"Залишок ігрового часу:",
						"successRate":"Відсоток успішності:",
						"viewNotGuessed":"Переглянути не відгадані варіанти"
					},
					{
						"dateOfPassage":"Дата проходження:",
						"rightOptions":"Правильні варіанти:",
						"wrongOptions":"Неправильні варіанти:",
						"totalOptions":"Всього варіантів:",
						"restPlayingTime:":"Залишок ігрового часу:",
						"successRate":"Відсоток успішності:",
						"viewNotGuessed":"Переглянути не відгадані варіанти"
					},
					{
						"dateOfPassage":"Дата проходження:",
						"rightOptions":"Правильні варіанти:",
						"wrongOptions":"Неправильні варіанти:",
						"totalOptions":"Всього варіантів:",
						"restPlayingTime:":"Залишок ігрового часу:",
						"successRate":"Відсоток успішності:",
						"viewNotGuessed":"Переглянути не відгадані варіанти"
					}
				]
			},
			"pageInfo3":{
				"exercise":"Вправа",
				"page":"Сторінка"
			},
			"listC3":{
				"items":[
					{
						"dateOfPassage":"Дата проходження:",
						"rightOptions":"Правильні варіанти:",
						"wrongOptions":"Неправильні варіанти:",
						"totalOptions":"Всього варіантів:",
						"restPlayingTime:":"Залишок ігрового часу:",
						"successRate":"Відсоток успішності:",
						"viewNotGuessed":"Переглянути не відгадані варіанти"
					},
					{
						"dateOfPassage":"Дата проходження:",
						"rightOptions":"Правильні варіанти:",
						"wrongOptions":"Неправильні варіанти:",
						"totalOptions":"Всього варіантів:",
						"restPlayingTime:":"Залишок ігрового часу:",
						"successRate":"Відсоток успішності:",
						"viewNotGuessed":"Переглянути не відгадані варіанти"
					},
					{
						"dateOfPassage":"Дата проходження:",
						"rightOptions":"Правильні варіанти:",
						"wrongOptions":"Неправильні варіанти:",
						"totalOptions":"Всього варіантів:",
						"restPlayingTime:":"Залишок ігрового часу:",
						"successRate":"Відсоток успішності:",
						"viewNotGuessed":"Переглянути не відгадані варіанти"
					},
					{
						"dateOfPassage":"Дата проходження:",
						"rightOptions":"Правильні варіанти:",
						"wrongOptions":"Неправильні варіанти:",
						"totalOptions":"Всього варіантів:",
						"restPlayingTime:":"Залишок ігрового часу:",
						"successRate":"Відсоток успішності:",
						"viewNotGuessed":"Переглянути не відгадані варіанти"
					},
					{
						"dateOfPassage":"Дата проходження:",
						"rightOptions":"Правильні варіанти:",
						"wrongOptions":"Неправильні варіанти:",
						"totalOptions":"Всього варіантів:",
						"restPlayingTime:":"Залишок ігрового часу:",
						"successRate":"Відсоток успішності:",
						"viewNotGuessed":"Переглянути не відгадані варіанти"
					}
				]
			}
		},
		"deleteMethodsData":{
			"methodDelete1":{
				"description":"Видалити результати вправи № 1",
				"buttonYes":"Так",
				"buttonNo":"Ні"
			},
			"methodDelete2":{
				"description":"Видалити результати вправи № 2",
				"buttonYes":"Так",
				"buttonNo":"Ні"
			},
			"methodDelete3":{
				"description":"Видалити результати вправи № 3",
				"buttonYes":"Так",
				"buttonNo":"Ні"
			},
			"methodDelete4":{
				"description":"Видалити всі дані користувача",
				"buttonYes":"Так",
				"buttonNo":"Ні"
			}
		},
		"singleBlockFailedResults":{
			"displayIfZeroFailed":{
				"congratulationTitle":"Вітаємо! Ви не допустили жодної помилки!"
			}
		},
		"authorsPage":{
			"toProfileAuthors":{
				"buttonTitle":"Повернутися до профілю"
			},
			"authorsHeader":{
				"titleHeader":"Автори програми",
				"contentHeader":"Привіт друже!",
				"contentCenter":"Вивчення англійської мови - це праця, праця над самим собою. Постійне зубріння правил граматики, а також заучування слів іноді відбивають подальше бажання до навчання. Саме тому ми представляємо програму для вивчення англійських неправильних дієслів трьома різними способами.",
				"contentLast":"Будемо раді допомогти тобі у навчанні."
			},
			"authorList1":{
				"author":"Автор: ",
				"authorName":"Михайло Холод (МХ)",
				"authorRole":"Роль: ",
				"authorRoleName":"Frontend Developer, UI/UX",
				"authorEmail":"Пошта: ",
				"authorEmailName":"mishika@i.ua",
				"authorSite":"Сайт портфоліо автора програми: ",
				"authorSiteName":"http://mikeportfolio.com.ua"
			},
			"authorList2":{
				"author":"Автор: ",
				"authorName":"Альона Яворська",
				"authorRole":"Роль: ",
				"authorRoleName":"Junior Frontend Developer, UI/UX",
				"authorEmail":"Пошта: ",
				"authorEmailName":"alenka@i.ua",
				"authorSite":"Сайт портфоліо автора програми: ",
				"authorSiteName":"http://alenkaportfolio.com.ua"
			}
		},
		"serverSisdeOnly":{
			"emailRestoring":{
				"topic":"Відновлення паролю",
				"greeting":"Привіт",
				"textBeforePassword":"твій новий пароль",
				"textAfterPassword":"ти завжди можеш його змінити в розділі 'Налаштування профілю'."
			}
		},
		"identifier":"ukr"
	}
};