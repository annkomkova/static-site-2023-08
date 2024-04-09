import "./search-vanilla.css";

function initSearch() {
  const O_Search = document.querySelector(".O_Search");
  const A_Button = document.querySelector(".A_Button");
  const A_SearchInput = document.querySelector(".A_SearchInput");

  let requestText = getSearchRequest();

  if (requestText != undefined) {
    A_SearchInput.value = requestText;

    //будет работать, когда подключим данные
    if (content) {
      SearchContent(requestText);
    }
  } else {
    A_SearchInput.value = "";
  }

  A_SearchInput.addEventListener("input", (e) => {
    requestText = e.target.value;

    if (requestText.length >= 3) {
      A_Button.classList.remove("disabled");
    } else {
      A_Button.classList.add("disabled");
    }
  });

  A_Button.addEventListener("click", (e) => {
    if (!e.target.classList.contains("disabled")) {
      requestText = A_SearchInput;
      setSearchRequest();
      SearchContent(requestText);
    }
  });

  A_SearchInput.addEventListener("keydown", (e) => {
    requestText = e.target.value;

    if (e.key === "Enter") {
      setSearchRequest();
    }
  });
}

function getSearchRequest() {
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);

  if (searchParams.has("request")) {
    return searchParams.get("request");
  }
}

function setSearchRequest() {
  const url = window.location.href.split("?")[0];

  window.location.href = url + "request=" + requestText;
}

function createContentCard(contentItemData) {
  const contentItem = document.createElement("div");
  contentItem.classList.add("O_ContentItem");

  const contentItemCover = document.createElement("img");
  contentItemCover.classList.add("A_ContentItemCover");
  contentItemCover.src = contentItemData.image;

  const contentItemTitle = document.createElement("h2");
  contentItemTitle.classList.add("A_ContentItemTitle");
  contentItemTitle.innerText = contentItemData.title;

  const contentItemDescription = document.createElement("p");
  contentItemDescription.classList.add("A_ContentItemDescription");
  contentItemDescription.innerText = contentItemData.description;

  const contentItemTags = document.createElement("div");
  contentItemTags.classList.add("C_ContentItemTags");

  contentItemData.tags.forEach((tag) => {
    const contentItemTag = document.createElement("div");
    contentItemTag.classList.add("A_ContentItemTag");
    contentItemTag.innerText = tag;

    contentItemTags.appendChild(contentItemTag);
  });

  contentItem.appendChild(contentItemCover);
  contentItem.appendChild(contentItemTitle);
  contentItem.appendChild(contentItemDescription);
  contentItem.appendChild(contentItemTags);

  return contentItem;
}

function SearchContent(requestText) {
  const contentItemContainer = document.querySelector(".S_Content");
  contentItemContainer.innerHTML = "";

  let contentItemIds = [];

  content.forEach((contentItem) => {
    const nbspRegex = /[\u202F\u00A0]/gm;
    const punctuationRegex = /[.,\/#!$%\^&\*;:{}=\-_`~()]/gm;

    let { title, description } = contentItem;

    title = title.replaceAll(nbspRegex, " ");
    title = title.replaceAll(punctuationRegex, "");

    description = description.replaceAll(nbspRegex, " ");
    description = description.replaceAll(punctuationRegex, "");

    if (requestText.length >= 3) {
      if (title.includes(requestText) || description.includes(requestText)) {
        contentItemIds.push(contentItem.id);
      }
    } else {
      contentItemIds.push(contentItem.id);
    }
  });

  if (contentItemIds.length > 0) {
    renderCardsByIds(contentItemContainer, contentItemIds);
  } else {
    renderNothingFound(contentItemContainer);
  }
}

function renderNothingFound(container) {
  container.innerHTML = "Ничего не найдено";
}

function renderCardsByIds(container, ids) {
  ids = [...new Set(ids)];

  ids.forEach((id) => {
    content.forEach((item) => {
      if (item.id == id) {
        container.appendChild(createContentCard(item));
      }
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initSearch();
  getSearchRequest();
});
