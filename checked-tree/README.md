### Checked-tree challenge

---

The challenge consists in building a nested tree of checkboxes, each one of them having the following property:

- label (string)
- checked (boolean)
- children (optional array of same properties specific above)

Whenever one of the children is checked, all of the parents will have to be recursively set to checked.

When one of the parents instead is unchecked, all of the children elements will be set to unchecked.
