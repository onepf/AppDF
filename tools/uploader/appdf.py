import os
import sys

    
try:
    sys.frozen
except AttributeError:
    sys.frozen = None
    
if sys.frozen == None:
    current_dir = os.path.dirname(os.path.realpath(__file__))
else:
    current_dir = os.path.dirname(os.path.realpath(sys.argv[0]))

lib_dir = os.path.realpath(os.path.join(current_dir, ".", "lib"))
sys.path.insert(0, lib_dir)

lib_dir = os.path.realpath(os.path.join(current_dir, ".", "webkit_server"))
sys.path.insert(0, lib_dir)


import argparse
import appdf
import re


def parse_args():
    argument_parser = argparse.ArgumentParser(description="AppDF publisher")
    
    argument_parser.add_argument("--url", help="URL")
    argument_parser.add_argument("--amazon", help="Amazon flag", 
                                action="store_true")
    argument_parser.add_argument("--googleplay", help="GooglePlay flag", 
                                action="store_true")
    argument_parser.add_argument("--command", help="Protocol command")
    argument_parser.add_argument("--package", help="Protocol package, \
        required for command activate or check only")
    
    argument_parser.add_argument("file", metavar="FILE", help="AppDF file")
    argument_parser.add_argument("--username", help="Username")
    argument_parser.add_argument("--password", help="Password")
    argument_parser.add_argument("--validate", "-v", action="store_true", 
                                 help="Validate AppDF schema")
    argument_parser.add_argument("--debug-dir", 
                                 help="Directory for browser screenshots")
    
    return argument_parser.parse_args()


def main():
    args = parse_args()
    
    #validate url
    regexp = re.compile('^((https?|ftp)://|(www|ftp)\.)[a-z0-9-]+(\.[a-z0-9-]+)+([/?].*)?$', re.IGNORECASE)
    if args.url:
        if regexp.match(args.url):
            pass
        else:
            print "Non valid URL"
            sys.exit(1)

    #validate file
    try:
        file = {'file': (args.file, open(args.file, 'rb'))}
    except IOError as e:
        print "Cannot open %s" % args.file
        sys.exit(1)
    
    app = None
    if args.amazon:
        app = appdf.parsers.Amazon(args.file)
    elif args.googleplay:
        app = appdf.parsers.GooglePlay(args.file)
    
    if app:
        app.parse()
        if args.validate:
            app.validate()
    
    publisher = None
    if args.amazon:
        publisher = appdf.publishers.Amazon(app, args.username, 
            args.password, args.debug_dir)
    elif args.googleplay:
        publisher = appdf.publishers.GooglePlay(app, args.username, 
            args.password, args.debug_dir)
    elif args.url:
        publisher = appdf.publishers.AppdfSender(args.username, args.password, 
            args.url, args.command, args.package, file)
    
    if publisher:
        publisher.publish()
    else:
        print "Error. No market selected"
        
if __name__ == "__main__":
    main()
