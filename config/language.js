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
		"singleBlockFailedResults":{
			"displayIfZeroFailed":{
				"congratulationTitle":"Поздравляем! Вы не допустили ни одной ошибки!"
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
		"singleBlockFailedResults":{
			"displayIfZeroFailed":{
				"congratulationTitle":"Вітаємо! Ви не допустили жодної помилки!"
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