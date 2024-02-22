import TsButton from "./src/index";

TsButton.install = function (Vue) {
    Vue.component(TsButton.name, TsButton);
}
export default TsButton;