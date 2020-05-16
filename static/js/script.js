// const apiUrl = 'http://localhost:3000/dev/todos';
const apiUrl =
  "https://7i7o88hue9.execute-api.ap-northeast-1.amazonaws.com/dev/todos";

new Vue({
  el: "#app",
  data: function () {
    return {
      items: [],
      newDialog: false,
      deleteDialog: false,
      newTitle: "",
      newContent: "",
      deleteTargetItem: null,
      deleteTargetIndex: null,
      titleRules: [(v) => !!v || "Title is required"],
      contentRules: [(v) => !!v || "Content is required"],
    };
  },
  mounted: function () {
    const self = this;
    axios.get(apiUrl).then((res) => {
      self.items = res.data;
    });
  },
  methods: {
    // Creato One Todo
    onClickNewSave: async function () {
      if (this.newTitle && this.newContent) {
        await axios.post(apiUrl, {
          title: this.newTitle,
          content: this.newContent,
        });

        // dialogを閉じる
        this.newDialog = false;

        // フォームクリア
        this.newTitle = "";
        this.newContent = "";

        axios.get(apiUrl).then((res) => {
          this.items = res.data;
        });
      }
    },
    // Update One Todo
    onChangeCheckbox: function (item) {
      axios.put(`${apiUrl}/${item.id}`, {
        isChecked: item.isChecked,
      });
    },
    // Get One Delete-Todo
    onClickDeleteButton: function (item, index) {
      this.deleteDialog = true;
      this.deleteTargetItem = item;
      this.deleteTargetIndex = index;
    },
    // Delete One Todo
    onClickDeleteOK: function (item, index) {
      axios.delete(`${apiUrl}/${this.deleteTargetItem.id}`).then(() => {
        this.items.splice(this.deleteTargetIndex, 1);
        this.deleteDialog = false;
        this.deleteTargetItem = null;
        this.deleteTargetIndex = null;
      });
    },
    // Get One Delete-Cancel-Todo
    onClickDeleteCancel: function (item, index) {
      this.deleteDialog = false;
      this.deleteTargetItem = null;
      this.deleteTargetIndex = null;
    },
  },
});
