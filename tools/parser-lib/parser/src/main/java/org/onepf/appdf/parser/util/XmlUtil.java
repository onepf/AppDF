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
package org.onepf.appdf.parser.util;

import org.onepf.appdf.parser.ParsingException;
import org.w3c.dom.DOMException;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import java.beans.IntrospectionException;
import java.beans.PropertyDescriptor;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.*;

public class XmlUtil {

    public static final String YES = "yes";

    private XmlUtil() {
    }

    public static List<Node> extractChildElements(Node parent) {
        List<Node> result = new ArrayList<Node>();
        NodeList childNodes = parent.getChildNodes();
        for (int i = 0; i < childNodes.getLength(); i++) {
            Node child = childNodes.item(i);
            if (child.getNodeType() == Node.ELEMENT_NODE) {
                result.add(child);
            }
        }
        return result;
    }

    public static String getOptionalAttributeValue(NamedNodeMap attrs,
            String name) {

        Node namedItem = attrs.getNamedItem(name);
        if (namedItem == null) {
            return "";
        } else {
            return namedItem.getTextContent();
        }
    }

    public static String tagNameToFieldName(String tagName) {
        int minusIndex = tagName.indexOf('-');
        while (minusIndex != -1) {
            char nextChar = tagName.charAt(minusIndex + 1);
            char upper = Character.toUpperCase(nextChar);
            StringBuilder sb = new StringBuilder(tagName);
            sb.replace(minusIndex + 1, minusIndex + 2, new String(
                    new char[] { upper }));
            sb.replace(minusIndex, minusIndex + 1, "");
            tagName = sb.toString();
            minusIndex = tagName.indexOf('-');
        }
        return tagName;
    }

   
    /**
     * currently only allready used types are supported:integers,bools,strings and enums
     * @param node
     * @param beanClass
     * @param bean
     * @throws DOMException
     * @throws ParsingException
     */
    @SuppressWarnings("unchecked")
    public static <T> void mapChildsToBean(Node node, Class<T> beanClass, T bean)
            throws DOMException, ParsingException {
        mapChildsToBean(node, beanClass, bean,Collections.EMPTY_LIST);
    }
    @SuppressWarnings("unchecked")
    public static <T> List<Node> mapChildsToBean(Node node, Class<T> beanClass, T bean,Collection<String> skipped)
            throws DOMException, ParsingException {
        List<Node> childNodes = extractChildElements(node);
        List<Node> skippedNodes = new ArrayList<Node>();
        boolean checkSkip = !skipped.isEmpty();
        for (Node child : childNodes) {
            String tagName = child.getNodeName();
            if ( checkSkip && skipped.contains(tagName)){
                skippedNodes.add(child);
                continue;
            }
            String originalTagName = tagName;
            tagName = tagNameToFieldName(tagName);
            String childValue = child.getTextContent();
            try {
                PropertyDescriptor pd = new PropertyDescriptor(tagName,
                        beanClass);
                Method writeMethod = pd.getWriteMethod();
                Class<?> propertyType = pd.getPropertyType();

                final Object param;
                if (boolean.class.equals(propertyType)) {//
                    boolean boolValue = YES.equalsIgnoreCase(childValue);
                    param = boolValue ? Boolean.TRUE : Boolean.FALSE;
                } else if (int.class.equals(propertyType)) {
                    param = Integer.parseInt(childValue);
                } else if (String.class.equals(propertyType)) {
                    param = childValue;
                } else if (propertyType.isEnum()) {
                    param = Enum.valueOf(propertyType.asSubclass(Enum.class),
                            childValue.toUpperCase());
                } 
                else {
                    throw new ParsingException("Unsupported property type:"
                            + propertyType);
                }
                writeMethod.invoke(bean, param);
            } catch (IntrospectionException e) {
                throw new ParsingException("Unexpected descriptor:"
                        + originalTagName + " mapped to " + tagName,e);
            } catch (IllegalArgumentException iae) {
                throw new ParsingException("Illegal descriptor value:"
                        + childValue,iae);
            } catch (InvocationTargetException | IllegalAccessException e) {
                throw new ParsingException(e);
            }
        }
        return skippedNodes;
    }


    public static List<String> collectNodeValues(Node node,
            String... acceptedTags) throws ParsingException {
        List<Node> children = extractChildElements(node);
        Set<String> set = new HashSet<>(Arrays.asList(acceptedTags));
        ArrayList<String> result = new ArrayList<String>();
        for (Node child : children) {
            String tag = child.getNodeName();
            if (!set.contains(tag)) {
                throw new ParsingException("Unsupported tag:" + tag);
            }
            result.add(child.getTextContent());
        }
        return result;
    }
}
