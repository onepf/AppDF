/*******************************************************************************
 * Copyright 2012 One Platform Foundation
 * 
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 * 
 *        http://www.apache.org/licenses/LICENSE-2.0
 * 
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 ******************************************************************************/
package org.onepf.appdf.parser;

import java.util.List;

import org.onepf.appdf.model.ModelElement;
import org.onepf.appdf.parser.util.XmlUtil;
import org.w3c.dom.Node;

/**
 * Base class for parser using enums values as inner parsers
 * 
 * @author nivanov
 * 
 * @param <T>
 * @param <E>
 */
public abstract class BaseParser<T extends ModelElement, E extends Enum<E> & NodeParser<T>>
        implements NodeParser<T> {

    private final Class<E> enumClass;
    private final String enclosingTagName;

    public BaseParser(Class<E> enumClass, String enclosingTagName) {
        this.enumClass = enumClass;
        this.enclosingTagName = enclosingTagName;

    }
    

    @Override
    public void parse(Node node, T element) {
        List<Node> childNodes = XmlUtil.extractChildElements(node);
        for (Node childNode : childNodes) {
            String tagName = childNode.getNodeName();
            if ( specialTag(tagName, element)){
                continue;
            }
            try {
                Enum.valueOf(enumClass, tagName.toUpperCase().replace('-', '_'))
                        .parse(childNode, element);
            } catch (IllegalArgumentException iae) {
                throw new ParsingException("Unsupported tag:" + tagName
                        + " inside of " + enclosingTagName);
            }
        }
    }
    
    protected boolean specialTag(String tagName,T element){
        return false;
    }

}
