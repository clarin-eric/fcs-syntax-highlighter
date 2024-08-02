(function (Prism) {

	// base on CQL language
	Prism.languages['fcs-lexcql'] = Prism.languages.extend('cql', {});

	// constructs not used in LexCQL
	delete Prism.languages['fcs-lexcql']['prefix'];
	delete Prism.languages['fcs-lexcql']['sortby'];

	// TODO: or do we want to add patterns for valid tokens first and invalid variants second (to support custom highlighting?)

	// only some subset of bool expressions used
	var boolExp = /\b(?:AND|NOT|OR)\b/i;
	Prism.languages['fcs-lexcql']['bool-group'].inside['boolean'].pattern = boolExp;

	// restrict relations in search clauses (XXX: support of negative look behind?)
	var comparitorExp = /(?:(?:<>|(?<!<|>)==?)(?![=><])|\b(?:exact|is|scr)\b)/;
	Prism.languages['fcs-lexcql']['search-clause'].inside['relation'].pattern = comparitorExp;

	// restrict to known fields (index) in search clause
	var fieldExp = /^\b(?:antonym|case|definition|entryId|etymology|gender|holonym|hypernym|hyponym|lemma|meronym|number|phonetic|pos|ref|related|segmentation|senseRef|subordinate|superordinate|synonym|transcription|translation)\b/;
	Prism.languages['fcs-lexcql']['search-clause'].inside['index'].pattern = fieldExp;

	// restrict relation modifiers in search clause (only known "/lang=value")
	Prism.languages['fcs-lexcql']['search-clause'].inside['relation-modifier'].inside['modifier'].pattern = /(\/\s*)(?:lang)/;
	Prism.languages['fcs-lexcql']['search-clause'].inside['relation-modifier'].inside['comparitor'].pattern = /=/;

}(Prism));
