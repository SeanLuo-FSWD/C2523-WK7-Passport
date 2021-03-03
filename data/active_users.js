let active_list = {
  id_list: [],
};

function add_user(id) {
  if (!active_list.id_list.includes(parseInt(id))) {
    active_list.id_list.push(parseInt(id));
  }
}

function remove_user(id) {
  for (var i = 0; i < active_list.id_list.length; i++) {
    if (active_list.id_list[i] === parseInt(id)) {
      active_list.id_list.splice(i, 1);
    }
  }
}

module.exports = {
  active_list: active_list.id_list,
  add_user: add_user,
  remove_user: remove_user,
};
