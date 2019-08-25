// https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("score");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = score => {
  try {
    const serializedState = JSON.stringify(score);
    localStorage.setItem("score", serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};

export const clearStorage = () => {
  try {
    localStorage.setItem("score", "");
    window.location.reload(true);
  } catch (err) {
    console.log(err);
  }
};
