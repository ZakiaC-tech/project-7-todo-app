class TodoCounter {
  constructor(todos, selector) {
    this._element = document.querySelector(selector);

    this._completed = 0;
    this._total = 0;

    // initialize counts from initial todos
    todos.forEach((todo) => {
      this._total += 1;

      if (todo.completed) {
        this._completed += 1;
      }
    });

    this._updateText();
  }

  updateCompleted = (increment) => {
    if (increment) {
      this._completed += 1;
    } else {
      this._completed -= 1;
    }

    this._updateText();
  };

  updateTotal = (increment) => {
    if (increment) {
      this._total += 1;
    } else {
      this._total -= 1;
    }

    this._updateText();
  };

  _updateText() {
    this._element.textContent = `Showing ${this._completed} out of ${this._total} completed`;
  }
}

export default TodoCounter;
