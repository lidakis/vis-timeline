/**
 * @constructor Group
 * @param {Number | String} groupId
 * @param {ItemSet} itemSet
 */
function Group (groupId, itemSet) {
  this.groupId = groupId;

  this.itemSet = itemSet;

  this.dom = {};
  this.items = {}; // items filtered by groupId of this group

  this._create();
}

/**
 * Create DOM elements for the group
 * @private
 */
Group.prototype._create = function() {
  var label = document.createElement('div');
  label.className = 'vlabel';
  this.dom.label = label;

  var inner = document.createElement('div');
  inner.className = 'inner';
  label.appendChild(inner);
  this.dom.inner = inner;

  var group = document.createElement('div');
  group.className = 'group';
  group['timeline-group'] = this;
  this.dom.group = group;
};

/**
 * Get the foreground container element
 * @return {HTMLElement} foreground
 */
Group.prototype.getForeground = function getForeground() {
  return this.dom.group;
};

/**
 * Get the background container element
 * @return {HTMLElement} background
 */
Group.prototype.getBackground = function getBackground() {
  return this.itemSet.getBackground();
};

/**
 * Get the axis container element
 * @return {HTMLElement} axis
 */
Group.prototype.getAxis = function getAxis() {
  return this.itemSet.getAxis();
};

/**
 * Get the height of the itemsets background
 * @return {Number} height
 */
Group.prototype.getBackgroundHeight = function getBackgroundHeight() {
  return this.itemSet.height;
};

/**
 * Show this group: attach to the DOM
 */
Group.prototype.show = function show() {
  if (!this.dom.label.parentNode) {
    this.itemSet.getLabelSet().appendChild(this.dom.label);
  }

  if (!this.dom.group.parentNode) {
    this.itemSet.getForeground().appendChild(this.dom.group);
  }
};

/**
 * Hide this group: remove from the DOM
 */
Group.prototype.hide = function hide() {
  if (this.dom.label.parentNode) {
    this.dom.label.parentNode.removeChild(this.dom.label);
  }

  if (this.dom.group.parentNode) {
    this.dom.group.parentNode.removeChild(this.dom.group);
  }
};

/**
 * Add an item to the group
 * @param {Item} item
 */
Group.prototype.add = function add(item) {
  this.items[item.id] = item;
  item.setParent(this);
};

/**
 * Remove an item from the group
 * @param {Item} item
 */
Group.prototype.remove = function remove(item) {
  delete this.items[item.id];
  item.setParent(this.itemSet);
};

