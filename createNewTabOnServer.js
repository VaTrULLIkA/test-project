 /* Добавить новую табку BEGIN */

        body.on('click', 'a#addNewTab', function () {
            var addNewTab = $(this),
                addNewTabTEXT = addNewTab.text(),
                ulTabs = addNewTab.closest('ul.day-week-tabs'),
                entity = ulTabs.attr('entity');
            if (entity in jsonDataNotifications) {
                var listTabs = ulTabs.find('li[role="presentation"]'),
                    tabActive = ulTabs.find('li[role="presentation"].active'),
                    lastTab = $(listTabs[listTabs.length - 1]);
                if (listTabs.length < 7) {
                    addNewTab.html('<i class="fa fa-spinner fa-spin fa-1x fa-fw"></i> ' + addNewTabTEXT);
                    addNewTab.addClass('disabled');
                    addNewTab.prop('disabled', true);
                    $.post({
                        url: urlCreateTab,
                        data: {entity: entity},
                        complete: function () {
                            addNewTab.html(addNewTabTEXT);
                            addNewTab.removeClass('disabled');
                            addNewTab.prop('disabled', false);
                        },
                        success: function (data) {
                            data = JSON.parse(data);
                            if (data.created) {
                                if (listTabs.length == 0) {
                                    ulTabs.prepend(
                                        data.responsHeadTabHtml
                                    );
                                } else {
                                    $('div#wrapper' + entity[0].toUpperCase() + entity.slice(1) + 'Tabs div[role="tabpanel"].active').removeClass('active');
                                    tabActive.removeClass('active');
                                    lastTab.after(
                                        data.responsHeadTabHtml
                                    );
                                }
                                $('div#wrapper' + entity[0].toUpperCase() + entity.slice(1) + 'Tabs').append(
                                    data.responsTabHtml
                                );
                                jsonDataNotifications[entity][nextTabName] = [];
                                flashMessage('Создание данных для оповещения', 'Успех', flashMessageTypes.success);
                            } else {
                                flashMessage('Создание данных для оповещения', 'Возникла ошибка. Перезагрузите страницу, пожалуйста. И попробуйте снова.', flashMessageTypes.error);
                            }
                        },
                        error: function () {
                            flashMessage('Создание данных для оповещения', 'Возникла ошибка. Перезагрузите страницу, пожалуйста. И попробуйте снова.', flashMessageTypes.error);
                        }
                    });
                } else {
                    flashMessage('Много табок', 'Максимальное количество табок - 7.', flashMessageTypes.error);
                }
            }
        });

    /* Добавить новую табку END */
