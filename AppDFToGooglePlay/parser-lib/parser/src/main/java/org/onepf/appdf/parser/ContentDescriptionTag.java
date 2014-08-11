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

import static org.onepf.appdf.parser.util.XmlUtil.getOptionalAttributeValue;
import static org.onepf.appdf.parser.util.XmlUtil.mapChildsToBean;

import java.util.List;

import org.onepf.appdf.model.ContentDescription;
import org.onepf.appdf.model.ContentDescriptor;
import org.onepf.appdf.model.ContentRating;
import org.onepf.appdf.model.IncludedActivites;
import org.onepf.appdf.model.RatingCertificate;
import org.onepf.appdf.model.RatingCertificate.CertificateType;
import org.onepf.appdf.parser.util.XmlUtil;
import org.w3c.dom.NamedNodeMap;
import org.w3c.dom.Node;

public enum ContentDescriptionTag implements NodeParser<ContentDescription> {
    CONTENT_RATING {
        @Override
        public void parse(Node node, ContentDescription element)
                throws ParsingException {
            String rating = node.getTextContent();
            try {
                int digitalRating = Integer.parseInt(rating);
                ContentRating contentRating = ContentRating
                        .getByDigital(digitalRating);
                if (contentRating == null) {
                    throw new ParsingException("Unsupported content rating:"
                            + digitalRating);
                }
                element.setContentRating(contentRating);
            } catch (NumberFormatException e) {
                throw new ParsingException("Non numeric rating:" + rating);
            }
        }

    },
    RATING_CERTIFICATES{
        
        private final static String RATING_CERTIFICATE_TAG = "rating-certificate";
        private final static String TYPE_ATTR = "type";
        private final static String CERTIFICATE_ATTR = "certificate";
        private final static String MARK_ATTR = "mark";

        @Override
        public void parse(Node node, ContentDescription element)
                throws ParsingException {
            List<Node> children = XmlUtil.extractChildElements(node);
            for ( Node child : children ){
              String tagName = child.getNodeName();
              if ( ! RATING_CERTIFICATE_TAG.equalsIgnoreCase(tagName)){
                  throw new ParsingException("Unsupported tag inside rating-certificates:" + tagName);
              }
              NamedNodeMap attributes = child.getAttributes();
              Node typeAttribute = attributes.getNamedItem(TYPE_ATTR);
              if (typeAttribute == null ){
                  throw new ParsingException("Required attribute " +TYPE_ATTR + " missing" );
              }
              String typeName = typeAttribute.getTextContent().toUpperCase();
              RatingCertificate cert = new RatingCertificate();
              try{                  
                CertificateType type = RatingCertificate.CertificateType.valueOf(typeName);
                cert.setType(type);
              }catch(IllegalArgumentException iae){
                  throw new ParsingException("Unsupported certificate type:" + typeName);
              }
              cert.setValue(child.getTextContent());
              cert.setCertificate(getOptionalAttributeValue(attributes, CERTIFICATE_ATTR));
              cert.setMark(getOptionalAttributeValue(attributes, MARK_ATTR));
              element.addRatingCertificate(cert);
            }
        }
        
    },
    CONTENT_DESCRIPTORS{

        @Override
        public void parse(Node node, ContentDescription element)
                throws ParsingException {
            ContentDescriptor descriptor = new ContentDescriptor();
            mapChildsToBean(node,ContentDescriptor.class,descriptor);
            element.setContentDescriptor(descriptor);
        }
    },
    
    INCLUDED_ACTIVITIES{

        @Override
        public void parse(Node node, ContentDescription element)
                throws ParsingException {
            IncludedActivites activites = new IncludedActivites();
            mapChildsToBean(node,IncludedActivites.class, activites);
            element.setIncludedActivites(activites);
        }
        
    };

 
    
}
