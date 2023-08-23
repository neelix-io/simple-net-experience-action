## Contributing

Hi. Thank you for taking an interest in this project. We welcome contributions of any type from the community.
Here are some pointers and guidelines to help you get started.

## Submitting a pull request

1. Fork and clone the repository
2. Navigate to the local action directory: `cd .github/actions/process-reviews`
3. Install dependencies: `npm install`
4. Create a new branch: `git checkout -b my-branch-name`
5. Make your changes, add tests and make sure the tests still pass: `npm test`
6. Update dist/index.js using `npm run build`. This creates a single javascript file that is used as an entrypoint
   for the action.
8. Push to your fork and submit a pull request
9. Pat yourself on the back and wait for your pull request to be reviewed and merged

Here are a few things you can do that will increase the likelihood of your pull request being accepted:

- Write tests
- Make sure the `README.md` and any other relevant documentation are kept up-to-date.
- Keep your change as focused as possible. If there are multiple changes you would like to make that are not
  dependent upon each other, consider submitting them as separate pull requests.
- Write a good commit message.

## Resources

- [How to Contribute to Open Source](https://opensource.guide/how-to-contribute/)
- [Using Pull Requests](https://docs.github.com/en/github/collaborating-with-issues-and-pull-requests/about-pull-requests)
- [GitHub Help](https://docs.github.com/en)
