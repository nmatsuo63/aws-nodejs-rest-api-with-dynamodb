// const apiUrl = 'http://localhost:3000/dev/todos';
const apiUrl =
  "https://ljif22xnvh.execute-api.ap-northeast-1.amazonaws.com/dev/todos";

new Vue({
  el: "#app",
  data: function () {
    return {
      items: [],
      newDialog: false,
      deleteDialog: false,
      editDialog: false, //add
      newTitle: "",
      newContent: "",
    //   isChecked:false,
      deleteTargetItem: null,
      deleteTargetIndex: null,
      editTargetItem: null, //add
      editTargetIndex: null, //add
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
    // Create One Todo
    onClickNewSave: async function () {
      if (this.newTitle && this.newContent) {
        await axios.post(apiUrl, {
          title: this.newTitle,
          content: this.newContent,
        //   isChecked:false,
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
        console.log(item);
    
      axios.put(`${apiUrl}/${item.id}`, {
        isChecked: item.isChecked,
        title: item.title,
        content: item.content,
      });
    },
    // Get One Edit-Todo
    onClickEditButton: function (item, index) {
      // alert('Edit?');
      this.editDialog = true;
      this.editTargetItem = item;
      this.editTargetIndex = index;
      this.newTitle = item.title;
      this.newContent = item.content;
    },

    // Get One Edit-Cancel-Todo
    onClickEditCancel: function (item, index) {
      this.editDialog = false;
      this.editTargetIndex = null;
      this.editTargetIndex = null;
    },
    // Edit One Todo
    onClickEditSave: async function () {
      if (this.newTitle && this.newContent) {
        await axios.post(`${apiUrl}/${this.editTargetItem.id}`, {
          title: this.newTitle,
          content: this.newContent,
          id:this.editTargetItem.id,
        //   isChecked:false,
        });

        // dialogを閉じる
        this.editDialog = false;

        // フォームクリア
        this.newTitle = "";
        this.newContent = "";

        axios.get(apiUrl).then((res) => {
          this.items = res.data;
        });
      }
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
