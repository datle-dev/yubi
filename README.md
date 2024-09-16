# Yubi

## About

Yubi is a minimlist typing test heavily based on i.e. a clone of [monkeytype](https://monkeytype.com/).

This is intended to be a full-stack portfolio project that makes use of the following languages and technologies:
- Javascript
- React
- Node
- Express
- Tailwind CSS

## Features

Yubi's features include:

- minimalist design
- feedback on correct, incorrect, extra, and missed characters while typing
- timed and word count test modes
- results such as raw and net words per minute (WPM) and percent accuracy
- smooth caret that emulates the cursor in a text editor

## Roadmap

- [x] more English word groups (1k, 2k, 5k, 10k most common)
- [x] other word groups for fun and variety
- [ ] alternative keyboard layout training utilities
  - keyboard layout display
  - most frequent bigram/trigram word groups with configuration for keyboard or finger combinations
- [ ] programming practice mode
  - for learning to type numbers and symbols on programmable split ortho or column-staggered keyboards where non-alpha keys are often moved to different layers
- [ ] user accounts to save typing test history
- [ ] charts/plots of results

## Credits

All credit for the concept and design belongs to [monkeytype](https://monkeytype.com/).
Yubi is mostly recreating and reverse-engineering a few of its many features.

Project Gutenberg word frequency list is from [Wiktionary's April 2006 Project Gutenberg 1-10000 word frequency list](https://en.wiktionary.org/wiki/Wiktionary:Frequency_lists/PG/2006/04/1-10000).
The list of words was also filtered manually to remove possible offensive words, single letter entries, some number entries, and entries with apostrophes that did not make sense by themselves.

Sindarin words are from [Eldamo](https://eldamo.org/content/word-indexes/words-s.html) licensed under [CC BY 4.0 Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/).
These words are sorted alphabetically and not by any word frequency analysis.
Changes to the original dictionary list include substitution of accented vowels for normal vowels to simplify input for users.

Subtitle word frequency list is from [SUBTLEXus](https://www.ugent.be/pp/experimentele-psychologie/en/research/documents/subtlexus/overview.htm).
The list of words was also filtered manually to remove possibly offensive words.

Wikipedia word frequency list is from [IlyaSemenov/wikipedia-word-frequency](https://github.com/IlyaSemenov/wikipedia-word-frequency).

## Lessons Learned

TBD
