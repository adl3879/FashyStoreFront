export const RouteReducer = (state, action) => {
  switch(action.type) {
    case "CHANGE_ROUTE":
      return {
        ...state,
        route: action.payload
      }

    case "APPEND_PRODUCT":
      let product;
      if (history.pushState){
        const url = window.location.protocol + "//" + window.location.host + window.location.pathname + `?product=${action.payload}`;
        window.history.pushState({ path: url }, " ", url);

        const parsedUrl = new URL(url);
        product = parsedUrl.search.split("=")[1];
      }

      return {
        ...state,
        product,
      }

    case "UNDO_APPEND": 
      if (history.pushState){
        const url = window.location.protocol + "//" + window.location.host + window.location.pathname + "";
        window.history.pushState({ path: url }, " ", url);
      }

      return {
        ...state,
      }

    default:
      return state
  }
}