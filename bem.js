const { toString } = Object.prototype;

const getTag = (value) => {
	if (value == null) {
		return value === undefined ? '[object Undefined]' : '[object Null]'
	}
	return toString.call(value)
}

const isString = (value) => {
	const type = typeof value;
	return (
		type === 'string' ||
		(type === 'object' &&
			value != null &&
			!Array.isArray(value) &&
			getTag(value) === '[object String]')
	);
}

const  isObject = (value) => {
	const type = typeof value;
	return value != null && (type === 'object' || type === 'function');
}

const getStyleElement = (string, style) => {
	return style[string] !== undefined ? style[string] : string;
};

const getModifiers = (object) =>
	Object.keys(object).reduce((acc, key) => {
		const value = object[key];
		
		if (value) {
			const name = isString(key) ? key.trim() : key;
			return acc.concat(name);
		}
		
		return acc;
	}, []);

const addBlockNameToModifiers = (array, blockname, styles, isDebag) => {
	if (isDebag) {
		console.log('addBlockNameToModifiers-array', array);
	}
	return array.map((modifier) => {
		const arrres = getStyleElement(`${blockname}_${modifier}`, styles);
		return arrres;
	});
};

const generateModifiers = (modifaers, blockname, styles, isDebag) => {
	const array = getModifiers(modifaers);
	const res = addBlockNameToModifiers(array, blockname, styles, isDebag);
	return res;
};

const getAffix = (name, blockname, isDebag) => {
	const affix = `${blockname}__${name}`;
	if (isDebag) {
		console.log('getAffix-affix', affix);
	}
	return name.trim() ? affix : blockname;
};

const getFullName = ({ affix = '', modifiers, styles }, isDebag) => {
	const { mix, ...rest } = modifiers;
	if (isDebag) {
		console.log('getFullName-afix', affix);
		console.log('getFullName-modifiers', modifiers);
	}
	
	const string = `${getStyleElement(affix, styles)} ${
		Object.keys(rest).length
			? `${[...generateModifiers(rest, affix, styles, isDebag)].join(' ')}`
			: ''
	}`;
	return mix ? string.concat(` ${mix}`) : string;
};

const bem = (blockname, styles) => {
	if (!isString(blockname)) {
		throw new Error('Expected type of block name string, but got: ', blockname);
	}
	
	return (...args) => {
		const [firstArg, secondArg, isDebag] = args;
		
		if (isObject(firstArg)) {
			return getFullName({ affix: blockname, modifiers: firstArg, styles }, isDebag || secondArg);
		}
		if (isString(firstArg)) {
			const affix = getAffix(firstArg, blockname, isDebag);
			
			if (isObject(secondArg)) {
				return getFullName(
					{
						affix,
						modifiers: secondArg,
						styles,
					},
					isDebag,
				);
			}
			
			return getStyleElement(affix, styles);
		}
		
		return getStyleElement(blockname, styles);
	};
};

export default bem;
