var JSql = (function() {
	'use strict';

	function me() {
		this.jsons;
		this.tipo;
		this.properties = [];
		this.vals = [];
	}

	me.prototype.delete = function(json) {
		this.json = json;
		
		this.tipo = 'delete';

		return this;
	};
	me.prototype.insert = function(json) {
		this.json = json;
		
		this.tipo = 'insert';

		return this;
	};
	me.prototype.select = function(properties) {
		this.properties = properties.indexOf(',') !== -1 ? properties.split(',') : [properties];

		this.tipo = 'select';

		return this;
	};
	me.prototype.update = function(json) {
		this.json = json;
		
		this.tipo = 'update';

		return this;
	};

	me.prototype.from = function(json) {
		this.json = json;

		return this;
	};
	me.prototype.into = function(properties) {
		this.properties = properties.indexOf(',') !== -1 ? properties.split(',') : [properties];

		return this;
	};
	me.prototype.set = function(properties) {
		var i,
			length,
			props;

		props = properties.indexOf(',') !== -1 ? properties.split(',') : [properties];

		for (i = 0, length = props.length; i < length; i++) {
			this.properties.push(props[i].trim().split('='));
		}

		return this;
	};
	me.prototype.values = function(vals) {
		this.vals = vals.indexOf(',') !== -1 ? vals.split(',') : [vals];

		return this;
	};
	me.prototype.where = function(properties) {
		var i,
			length,
			props;

		props = properties.indexOf(',') !== -1 ? properties.split(',') : [properties];

		for (i = 0, length = props.length; i < length; i++) {
			this.properties.push(props[i].trim().split('='));
		}

		return this;
	};

	me.prototype.query = function() {
		var data = {},
			i,
			length,
			property,
			value;

		switch (this.tipo) {
			case 'delete':
				for (i = 0, length = this.properties.length; i < length; i++) {
					property = this.properties[i][0];
					value = this.properties[i][1];
					
					if (value.substr(0, 1) === '"') {
						value = value.substr(1, value.length-2);
					} else if (value === 'true' || value === 'false') {
						value = Boolean(value);
					} else {
						value = parseFloat(value);
					}

					if (this.json[0][property] === value) {
						delete this.json[0][property];
					}
				}
				break;
				
			case 'insert':
				for (i = 0, length = this.properties.length; i < length; i++) {
					property = this.properties[i];
					value = this.vals[i];
					
					this.json[0][property] = value;
				}
				break;

			case 'select':
				for (i = 0, length = this.properties.length; i < length; i++) {
					property = this.properties[i].trim();
					if (this.json[0].hasOwnProperty(property) === true) {
						data[property] = this.json[0][property];
					}
				}
				return data;
				
			case 'update':
				for (i = 0, length = this.properties.length; i < length; i++) {
					property = this.properties[i][0];
					value = this.properties[i][1];
					
					if (value.substr(0, 1) === '"') {
						this.json[0][property] = value.substr(1, value.length-2);
					} else if (value === 'true' || value === 'false') {
						this.json[0][property] = Boolean(value);
					} else {
						this.json[0][property] = parseFloat(value);
					}
				}
				break;
		}
	};

	return new me();
});