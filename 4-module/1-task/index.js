function makeFriendsList(friends) {
  let list = document.createElement("ul");

  for (let friend of friends) {
    let listItem = document.createElement("li");
    listItem.innerHTML = friend.firstName + " " + friend.lastName;
    list.append(listItem);
  }

  return list;
}
