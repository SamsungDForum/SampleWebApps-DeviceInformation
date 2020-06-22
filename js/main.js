App = window.App || {};
App.Main = (function Main() {
    var logger = null;
    var basicMenu = null;
    var subbuttonsSystemEl = document.querySelector('.subbuttons-system');
    var mainEl = document.querySelector('.info-inner-container');

    function getProductInfo() {
        var productInfo = {};

        try {
            productInfo.Duid = webapis.productinfo.getDuid();
            productInfo.Firmware = webapis.productinfo.getFirmware();
            productInfo.Local_Set = webapis.productinfo.getLocalSet();
            productInfo.Model = webapis.productinfo.getModel();
            productInfo.Model_Code = webapis.productinfo.getModelCode();
            productInfo.No_Glass_3d_Support = webapis.productinfo.getNoGlass3dSupport();
            productInfo.Psid = webapis.productinfo.getPsid();
            productInfo.Real_Model = webapis.productinfo.getRealModel();
            productInfo.SmartTV_Server_Type = webapis.productinfo.getSmartTVServerType();
            productInfo.SmartTV_Server_Version = webapis.productinfo.getSmartTVServerVersion();
            productInfo.Tuner_Epop = webapis.productinfo.getTunerEpop();
            productInfo.Version = webapis.productinfo.getVersion();
            productInfo.Is_Soccer_Mode_Enabled = webapis.productinfo.isSoccerModeEnabled();
            productInfo.Is_Ttv_Supported = webapis.productinfo.isTtvSupported();
            productInfo.Is_Ud_Panel_Supported = webapis.productinfo.isUdPanelSupported();
        } catch (e) {
            logger.error(e.message);
        }

        return productInfo;
    }

    function createSpan(text) {
        var span = document.createElement('span');

        span.innerHTML = text;

        return span;
    }

    function showProductInfo() {
        var productInfo = getProductInfo();
        var spans = Object.getOwnPropertyNames(productInfo)
            .map(function (prop) {
                var propNameSpaced = prop.replace(/_/g, ' ');

                return createSpan(propNameSpaced + ': ' + productInfo[prop]);
            });

        hideSubbuttons();
        mainEl.innerHTML = '';
        spans.forEach(function (span) {
            mainEl.appendChild(span);
        });
    }

    function onError(error) {
        logger.error(error.message);
    }

    function capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function showCapability(capability) {
        try {
            tizen.systeminfo.getPropertyValue(capability, function (data) {
                Object.getOwnPropertyNames(data).forEach(function (propName) {
                    mainEl.appendChild(
                        createSpan(
                            capitalizeFirst(propName) + ': ' + data[propName]
                        )
                    );
                });
            }, onError);
        } catch (e) {
            logger.error('[' + capability + '] ' + e.message);
        }
    }

    function showEthernetNetwork() {
        mainEl.innerHTML = '';

        showCapability('ETHERNET_NETWORK');
    }

    function showMemory() {
        mainEl.innerHTML = '';

        try {
            mainEl.appendChild(createSpan('Total Memory: ' + tizen.systeminfo.getTotalMemory()));
            mainEl.appendChild(createSpan('Available Memory: ' + tizen.systeminfo.getAvailableMemory()));
        } catch (e) {
            logger.error(e.message);
        }
    }

    function showDisplay() {
        mainEl.innerHTML = '';

        showCapability('DISPLAY');
    }

    function showStorage() {
        mainEl.innerHTML = '';

        try {
            tizen.systeminfo.getPropertyValue('STORAGE', function (data) {
                data.units.forEach(function (storageUnit) {
                    var div = document.createElement('div');

                    Object.getOwnPropertyNames(storageUnit).forEach(function (propName) {
                        div.appendChild(
                            createSpan(
                                capitalizeFirst(propName) + ': ' + storageUnit[propName]
                            )
                        );
                    });
                    mainEl.appendChild(div);
                });
            }, onError);
        } catch (e) {
            logger.error('[STORAGE] ' + e.message);
        }
    }

    function showBuild() {
        mainEl.innerHTML = '';

        showCapability('BUILD');
    }

    function switchSubmenu(submenu) {
        hideSubbuttons();
        submenu.classList.remove('hidden');
        App.Navigation.registerMenu({
            domEl: submenu,
            name: 'Subbuttons',
            nextMenu: 'Basic'
        });
        basicMenu.previousMenu = 'Subbuttons';
    }

    function hideSubbuttons() {
        subbuttonsSystemEl.classList.add('hidden');
        App.Navigation.unregisterMenu('Subbuttons');
    }

    function onSystemInfoClicked() {
        switchSubmenu(subbuttonsSystemEl);
    }

    function onResetClicked() {
        mainEl.innerHTML = '';
        hideSubbuttons();
    }

    function getTvInfo() {
        var tvInfo = {};

        try {
            tvInfo.Version = webapis.tvinfo.getVersion();
            tvInfo.Is_Tvs_Pic_Size_Resized = webapis.tvinfo.isTvsPicSizeResized();
            tvInfo.Caption_On_Off = webapis.tvinfo.getMenuValue(webapis.tvinfo.TvInfoMenuKey.CAPTION_ONOFF_KEY);
            tvInfo.Caption_Mode = webapis.tvinfo.getMenuValue(webapis.tvinfo.TvInfoMenuKey.CAPTION_MODE_KEY);
            tvInfo.Caption_Font_Size = webapis.tvinfo.getMenuValue(webapis.tvinfo.TvInfoMenuKey.CAPTION_FONT_SIZE_KEY);
            tvInfo.Caption_Font_Style = webapis.tvinfo.getMenuValue(
                webapis.tvinfo.TvInfoMenuKey.CAPTION_FONT_STYLE_KEY
            );
            tvInfo.Caption_Foreground_Color = webapis.tvinfo.getMenuValue(
                webapis.tvinfo.TvInfoMenuKey.CAPTION_FG_COLOR_KEY
            );
            tvInfo.Caption_Background_Color = webapis.tvinfo.getMenuValue(
                webapis.tvinfo.TvInfoMenuKey.CAPTION_BG_COLOR_KEY
            );
        } catch (e) {
            logger.error(e.message);
        }

        return tvInfo;
    }

    function showTvInfo() {
        var tvInfo = getTvInfo();

        var spans = Object.getOwnPropertyNames(tvInfo)
            .map(function (prop) {
                var propNameSpaced = prop.replace(/_/g, ' ');

                return createSpan(propNameSpaced + ': ' + tvInfo[prop]);
            });

        hideSubbuttons();
        mainEl.innerHTML = '';
        spans.forEach(function (span) {
            mainEl.appendChild(span);
        });
    }

    function addButtonsHandlers() {
        var buttonsWithHandlers = [
            { elementSelector: '.system-info', handler: onSystemInfoClicked },
            { elementSelector: '.product-info', handler: showProductInfo },
            { elementSelector: '.tv-info', handler: showTvInfo },
            { elementSelector: '.reset', handler: onResetClicked },
            { elementSelector: '.ethernet-network', handler: showEthernetNetwork },
            { elementSelector: '.memory', handler: showMemory },
            { elementSelector: '.display', handler: showDisplay },
            { elementSelector: '.storage', handler: showStorage },
            { elementSelector: '.build', handler: showBuild }
        ];

        App.KeyHandler.addHandlersForButtons(buttonsWithHandlers);
    }

    window.onload = function onload() {
        basicMenu = App.Navigation.getMenu('Basic');
        basicMenu.selectionVisible = true;
        basicMenu.onActiveItemChanged = hideSubbuttons;

        logger = App.Logger.create({
            loggerName: 'Main',
            loggerEl: document.querySelector('.logsContainer'),
            logLevel: App.Logger.logLevels.ALL
        });

        addButtonsHandlers();
    };
}());
