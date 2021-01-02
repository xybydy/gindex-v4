const execa = require('execa');

module.exports = async (appname) => {
  try {
    const result = await execa('heroku', ['create', appname]);
    const tokenRegex = new RegExp('Creating '+appname+'... done');
    if(tokenRegex.test(result.stderr)){
      return {
        res: true,
        output: result.stdout+'\n'+result.stderr,
        cmd: result.command,
        exitCode: result.exitCode
      };
    } else {
      return {
        res: false,
        output: result.stdout+'\n'+result.stderr,
        cmd: result.command,
        exitCode: result.exitCode
      };
    }
  } catch(e) {
    return {
      res: false,
      output: e.stdout+'\n'+e.stderr,
      cmd: e.command,
      exitCode: e.exitCode
    };
  }
};
