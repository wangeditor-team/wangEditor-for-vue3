import { mount } from "@vue/test-utils";
import App from "../src/App.vue";

test("renders a Editor", () => {
  const wrapper = mount(App);
  expect(wrapper.vm).toBeTruthy();
});
